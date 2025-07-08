/**
 * Advanced Redis Caching System
 * Comprehensive caching solution with Redis for API responses and data
 */

import React from 'react';
import { Redis } from 'ioredis';
import { analytics } from '@/analytics/gtm-datalayer';

// Cache Configuration Types
export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  prefix?: string;
  namespace?: string;
  compression?: boolean;
  encryption?: boolean;
  version?: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  keys: number;
  memory: number;
  hitRate: number;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  version?: string;
  hash?: string;
}

// Cache Strategies
export type CacheStrategy = 
  | 'cache-first'     // Check cache first, fallback to source
  | 'cache-only'      // Only return cached data
  | 'network-first'   // Check network first, fallback to cache
  | 'network-only'    // Only fetch from network
  | 'stale-while-revalidate'; // Return stale cache while updating

// Advanced Redis Cache Manager
export class AdvancedCacheManager {
  private redis: Redis | null = null;
  private localCache: Map<string, CacheEntry> = new Map();
  private config: Required<CacheConfig>;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    keys: 0,
    memory: 0,
    hitRate: 0
  };

  constructor(config: CacheConfig = {}) {
    this.config = {
      ttl: config.ttl || 3600, // 1 hour default
      prefix: config.prefix || 'northpath',
      namespace: config.namespace || 'cache',
      compression: config.compression ?? true,
      encryption: config.encryption ?? false,
      version: config.version || '1.0'
    };

    this.initializeRedis();
    this.setupLocalCacheCleanup();
  }

  private async initializeRedis(): Promise<void> {
    try {
      // Initialize Redis connection
      const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
      
      if (redisUrl) {
        this.redis = new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          lazyConnect: true,
          keepAlive: 30000
        });

        this.redis.on('connect', () => {
          console.log('[Cache] Connected to Redis');
          this.trackEvent('redis_connected');
        });

        this.redis.on('error', (error) => {
          console.error('[Cache] Redis error:', error);
          this.trackEvent('redis_error', { error: error.message });
        });

        this.redis.on('close', () => {
          console.log('[Cache] Redis connection closed');
          this.trackEvent('redis_disconnected');
        });

        await this.redis.connect();
      } else {
        console.warn('[Cache] No Redis URL provided, using local cache only');
      }
    } catch (error) {
      console.error('[Cache] Failed to initialize Redis:', error);
      this.trackEvent('redis_init_failed', { error: (error as Error).message });
    }
  }

  private setupLocalCacheCleanup(): void {
    // Clean up expired local cache entries every 5 minutes
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.localCache.entries()) {
        if (now - entry.timestamp > entry.ttl * 1000) {
          this.localCache.delete(key);
        }
      }
      this.updateStats();
    }, 5 * 60 * 1000);
  }

  // Generate cache key
  private generateKey(key: string, namespace?: string): string {
    const ns = namespace || this.config.namespace;
    return `${this.config.prefix}:${ns}:${key}:v${this.config.version}`;
  }

  // Compress data if enabled
  private async compressData(data: any): Promise<string> {
    if (!this.config.compression) {
      return JSON.stringify(data);
    }

    try {
      // Use compression library if available
      const compressed = JSON.stringify(data); // Placeholder for actual compression
      return compressed;
    } catch (error) {
      console.warn('[Cache] Compression failed, using uncompressed data');
      return JSON.stringify(data);
    }
  }

  // Decompress data if enabled
  private async decompressData(data: string): Promise<any> {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('[Cache] Failed to decompress data:', error);
      throw error;
    }
  }

  // Set cache entry
  async set<T>(
    key: string, 
    data: T, 
    options: Partial<CacheConfig> = {}
  ): Promise<boolean> {
    try {
      const cacheKey = this.generateKey(key, options.namespace);
      const ttl = options.ttl || this.config.ttl;
      const timestamp = Date.now();

      const entry: CacheEntry<T> = {
        data,
        timestamp,
        ttl,
        version: options.version || this.config.version
      };

      const serializedData = await this.compressData(entry);

      // Try Redis first
      if (this.redis) {
        await this.redis.setex(cacheKey, ttl, serializedData);
      }

      // Always store in local cache as fallback
      this.localCache.set(cacheKey, entry);

      this.trackEvent('cache_set', { key: cacheKey, ttl });
      return true;

    } catch (error) {
      console.error('[Cache] Failed to set cache:', error);
      this.trackEvent('cache_set_failed', { 
        key, 
        error: (error as Error).message 
      });
      return false;
    }
  }

  // Get cache entry
  async get<T>(
    key: string, 
    options: Partial<CacheConfig> = {}
  ): Promise<T | null> {
    try {
      const cacheKey = this.generateKey(key, options.namespace);

      // Try Redis first
      if (this.redis) {
        const redisData = await this.redis.get(cacheKey);
        if (redisData) {
          const entry = await this.decompressData(redisData) as CacheEntry<T>;
          
          // Check if entry is still valid
          if (this.isEntryValid(entry)) {
            this.stats.hits++;
            this.trackEvent('cache_hit', { key: cacheKey, source: 'redis' });
            return entry.data;
          }
        }
      }

      // Fallback to local cache
      const localEntry = this.localCache.get(cacheKey);
      if (localEntry && this.isEntryValid(localEntry)) {
        this.stats.hits++;
        this.trackEvent('cache_hit', { key: cacheKey, source: 'local' });
        return localEntry.data as T;
      }

      this.stats.misses++;
      this.trackEvent('cache_miss', { key: cacheKey });
      return null;

    } catch (error) {
      console.error('[Cache] Failed to get cache:', error);
      this.trackEvent('cache_get_failed', { 
        key, 
        error: (error as Error).message 
      });
      return null;
    }
  }

  // Check if cache entry is valid
  private isEntryValid(entry: CacheEntry): boolean {
    const now = Date.now();
    const expiryTime = entry.timestamp + (entry.ttl * 1000);
    return now < expiryTime;
  }

  // Delete cache entry
  async delete(key: string, namespace?: string): Promise<boolean> {
    try {
      const cacheKey = this.generateKey(key, namespace);

      // Delete from Redis
      if (this.redis) {
        await this.redis.del(cacheKey);
      }

      // Delete from local cache
      this.localCache.delete(cacheKey);

      this.trackEvent('cache_delete', { key: cacheKey });
      return true;

    } catch (error) {
      console.error('[Cache] Failed to delete cache:', error);
      this.trackEvent('cache_delete_failed', { 
        key, 
        error: (error as Error).message 
      });
      return false;
    }
  }

  // Clear all cache entries
  async clear(namespace?: string): Promise<boolean> {
    try {
      const pattern = this.generateKey('*', namespace);

      // Clear Redis
      if (this.redis) {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      }

      // Clear local cache
      if (namespace) {
        const nsPattern = this.generateKey('', namespace);
        for (const key of this.localCache.keys()) {
          if (key.startsWith(nsPattern)) {
            this.localCache.delete(key);
          }
        }
      } else {
        this.localCache.clear();
      }

      this.trackEvent('cache_clear', { namespace });
      return true;

    } catch (error) {
      console.error('[Cache] Failed to clear cache:', error);
      this.trackEvent('cache_clear_failed', { 
        namespace, 
        error: (error as Error).message 
      });
      return false;
    }
  }

  // Cache with strategy
  async cacheWithStrategy<T>(
    key: string,
    fetchFn: () => Promise<T>,
    strategy: CacheStrategy = 'cache-first',
    options: Partial<CacheConfig> = {}
  ): Promise<T> {
    switch (strategy) {
      case 'cache-first':
        return this.cacheFirst(key, fetchFn, options);
      
      case 'cache-only':
        return this.cacheOnly(key);
      
      case 'network-first':
        return this.networkFirst(key, fetchFn, options);
      
      case 'network-only':
        return this.networkOnly(fetchFn);
      
      case 'stale-while-revalidate':
        return this.staleWhileRevalidate(key, fetchFn, options);
      
      default:
        throw new Error(`Unknown cache strategy: ${strategy}`);
    }
  }

  // Cache-first strategy
  private async cacheFirst<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: Partial<CacheConfig>
  ): Promise<T> {
    const cached = await this.get<T>(key, options);
    
    if (cached !== null) {
      return cached;
    }

    const data = await fetchFn();
    await this.set(key, data, options);
    return data;
  }

  // Cache-only strategy
  private async cacheOnly<T>(key: string): Promise<T> {
    const cached = await this.get<T>(key);
    
    if (cached === null) {
      throw new Error('No cached data available');
    }

    return cached;
  }

  // Network-first strategy
  private async networkFirst<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: Partial<CacheConfig>
  ): Promise<T> {
    try {
      const data = await fetchFn();
      await this.set(key, data, options);
      return data;
    } catch (error) {
      console.warn('[Cache] Network request failed, trying cache');
      const cached = await this.get<T>(key, options);
      
      if (cached !== null) {
        return cached;
      }

      throw error;
    }
  }

  // Network-only strategy
  private async networkOnly<T>(fetchFn: () => Promise<T>): Promise<T> {
    return fetchFn();
  }

  // Stale-while-revalidate strategy
  private async staleWhileRevalidate<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: Partial<CacheConfig>
  ): Promise<T> {
    const cached = await this.get<T>(key, options);

    // Return cached data immediately if available
    if (cached !== null) {
      // Revalidate in background
      fetchFn()
        .then(data => this.set(key, data, options))
        .catch(error => console.warn('[Cache] Background revalidation failed:', error));
      
      return cached;
    }

    // If no cache, fetch and cache
    const data = await fetchFn();
    await this.set(key, data, options);
    return data;
  }

  // Multi-get operation
  async multiGet<T>(
    keys: string[], 
    options: Partial<CacheConfig> = {}
  ): Promise<Map<string, T | null>> {
    const results = new Map<string, T | null>();

    try {
      const cacheKeys = keys.map(key => this.generateKey(key, options.namespace));

      // Try Redis pipeline for efficiency
      if (this.redis) {
        const pipeline = this.redis.pipeline();
        cacheKeys.forEach(key => pipeline.get(key));
        
        const redisResults = await pipeline.exec();
        
        for (let i = 0; i < keys.length; i++) {
          const result = redisResults?.[i];
          if (result && !result[0] && result[1]) {
            try {
              const entry = await this.decompressData(result[1] as string) as CacheEntry<T>;
              if (this.isEntryValid(entry)) {
                results.set(keys[i], entry.data);
                continue;
              }
            } catch (error) {
              console.warn('[Cache] Failed to parse Redis entry:', error);
            }
          }

          // Fallback to local cache
          const localEntry = this.localCache.get(cacheKeys[i]);
          if (localEntry && this.isEntryValid(localEntry)) {
            results.set(keys[i], localEntry.data as T);
          } else {
            results.set(keys[i], null);
          }
        }
      } else {
        // Local cache only
        for (let i = 0; i < keys.length; i++) {
          const entry = this.localCache.get(cacheKeys[i]);
          if (entry && this.isEntryValid(entry)) {
            results.set(keys[i], entry.data as T);
          } else {
            results.set(keys[i], null);
          }
        }
      }

    } catch (error) {
      console.error('[Cache] Multi-get failed:', error);
      // Return null for all keys on error
      keys.forEach(key => results.set(key, null));
    }

    return results;
  }

  // Multi-set operation
  async multiSet<T>(
    entries: Map<string, T>, 
    options: Partial<CacheConfig> = {}
  ): Promise<boolean> {
    try {
      const ttl = options.ttl || this.config.ttl;
      const timestamp = Date.now();

      // Redis pipeline for efficiency
      if (this.redis) {
        const pipeline = this.redis.pipeline();
        
        for (const [key, data] of entries) {
          const cacheKey = this.generateKey(key, options.namespace);
          const entry: CacheEntry<T> = {
            data,
            timestamp,
            ttl,
            version: options.version || this.config.version
          };
          
          const serializedData = await this.compressData(entry);
          pipeline.setex(cacheKey, ttl, serializedData);
        }

        await pipeline.exec();
      }

      // Local cache
      for (const [key, data] of entries) {
        const cacheKey = this.generateKey(key, options.namespace);
        const entry: CacheEntry<T> = {
          data,
          timestamp,
          ttl,
          version: options.version || this.config.version
        };
        
        this.localCache.set(cacheKey, entry);
      }

      this.trackEvent('cache_multi_set', { count: entries.size });
      return true;

    } catch (error) {
      console.error('[Cache] Multi-set failed:', error);
      this.trackEvent('cache_multi_set_failed', { 
        count: entries.size,
        error: (error as Error).message 
      });
      return false;
    }
  }

  // Get cache statistics
  async getStats(): Promise<CacheStats> {
    try {
      // Update Redis stats if available
      if (this.redis) {
        const info = await this.redis.info('memory');
        const memoryMatch = info.match(/used_memory:(\d+)/);
        this.stats.memory = memoryMatch ? parseInt(memoryMatch[1]) : 0;
        
        const keyCount = await this.redis.dbsize();
        this.stats.keys = keyCount;
      } else {
        this.stats.keys = this.localCache.size;
        this.stats.memory = this.estimateLocalCacheSize();
      }

      // Calculate hit rate
      const total = this.stats.hits + this.stats.misses;
      this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;

      return { ...this.stats };

    } catch (error) {
      console.error('[Cache] Failed to get stats:', error);
      return { ...this.stats };
    }
  }

  private estimateLocalCacheSize(): number {
    let size = 0;
    for (const entry of this.localCache.values()) {
      size += JSON.stringify(entry).length;
    }
    return size;
  }

  private updateStats(): void {
    this.stats.keys = this.localCache.size;
    this.stats.memory = this.estimateLocalCacheSize();
    
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }

  private trackEvent(event: string, data?: any): void {
    analytics.emitEvent('cache_operation' as any, {
      operation: event,
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  // Cleanup and disconnect
  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
      this.redis = null;
    }
    this.localCache.clear();
  }
}

// Singleton instance
export const cacheManager = new AdvancedCacheManager();

// React Hook for caching
export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    strategy?: CacheStrategy;
    ttl?: number;
    namespace?: string;
    enabled?: boolean;
  } = {}
) {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const {
    strategy = 'cache-first',
    ttl = 3600,
    namespace,
    enabled = true
  } = options;

  React.useEffect(() => {
    if (!enabled) return;

    let isCancelled = false;
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await cacheManager.cacheWithStrategy(
          key,
          fetchFn,
          strategy,
          { ttl, namespace }
        );

        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err as Error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [key, enabled]);

  const invalidate = React.useCallback(async () => {
    await cacheManager.delete(key, namespace);
  }, [key, namespace]);

  const refresh = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchFn();
      await cacheManager.set(key, result, { ttl, namespace });
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, ttl, namespace]);

  return {
    data,
    isLoading,
    error,
    invalidate,
    refresh
  };
}

// Decorator for caching function results
export function cached<T extends (...args: any[]) => Promise<any>>(
  options: {
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
    namespace?: string;
    strategy?: CacheStrategy;
  } = {}
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Parameters<T>) {
      const key = options.keyGenerator 
        ? options.keyGenerator(...args)
        : `${propertyKey}_${JSON.stringify(args)}`;

      return cacheManager.cacheWithStrategy(
        key,
        () => originalMethod.apply(this, args),
        options.strategy || 'cache-first',
        {
          ttl: options.ttl,
          namespace: options.namespace
        }
      );
    };

    return descriptor;
  };
}

export default cacheManager;
