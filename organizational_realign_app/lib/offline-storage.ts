/**
 * Offline Storage System using IndexedDB
 * Provides robust offline data storage and synchronization
 */

import { useState, useEffect } from 'react';

interface StoredItem {
  id: string
  data: any
  timestamp: number
  type: 'assessment' | 'analytics' | 'user_data' | 'cache'
  synced: boolean
}

interface QueueItem {
  id: string
  action: 'create' | 'update' | 'delete'
  endpoint: string
  data: any
  timestamp: number
  retries: number
}

class OfflineStorage {
  private dbName = 'northpath-db'
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Create object stores
        if (!db.objectStoreNames.contains('assessments')) {
          const assessmentStore = db.createObjectStore('assessments', { keyPath: 'id' })
          assessmentStore.createIndex('timestamp', 'timestamp')
          assessmentStore.createIndex('synced', 'synced')
        }
        
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' })
          analyticsStore.createIndex('timestamp', 'timestamp')
          analyticsStore.createIndex('synced', 'synced')
        }
        
        if (!db.objectStoreNames.contains('cache')) {
          const cacheStore = db.createObjectStore('cache', { keyPath: 'id' })
          cacheStore.createIndex('timestamp', 'timestamp')
          cacheStore.createIndex('type', 'type')
        }
        
        if (!db.objectStoreNames.contains('sync_queue')) {
          const queueStore = db.createObjectStore('sync_queue', { keyPath: 'id' })
          queueStore.createIndex('timestamp', 'timestamp')
          queueStore.createIndex('action', 'action')
        }
        
        if (!db.objectStoreNames.contains('user_data')) {
          const userStore = db.createObjectStore('user_data', { keyPath: 'id' })
          userStore.createIndex('timestamp', 'timestamp')
        }
      }
    })
  }

  // Assessment storage
  async saveAssessment(assessment: any): Promise<void> {
    if (!this.db) await this.init()
    
    const item: StoredItem = {
      id: assessment.id || this.generateId(),
      data: assessment,
      timestamp: Date.now(),
      type: 'assessment',
      synced: false
    }
    
    return this.putItem('assessments', item)
  }

  async getAssessments(limit = 50): Promise<StoredItem[]> {
    if (!this.db) await this.init()
    return this.getAllItems('assessments', limit)
  }

  async getAssessment(id: string): Promise<StoredItem | null> {
    if (!this.db) await this.init()
    return this.getItem('assessments', id)
  }

  async deleteAssessment(id: string): Promise<void> {
    if (!this.db) await this.init()
    return this.deleteItem('assessments', id)
  }

  // Analytics storage
  async saveAnalyticsEvent(event: any): Promise<void> {
    if (!this.db) await this.init()
    
    const item: StoredItem = {
      id: this.generateId(),
      data: event,
      timestamp: Date.now(),
      type: 'analytics',
      synced: false
    }
    
    return this.putItem('analytics', item)
  }

  async getAnalyticsEvents(): Promise<StoredItem[]> {
    if (!this.db) await this.init()
    return this.getAllItems('analytics')
  }

  async markAnalyticsSynced(id: string): Promise<void> {
    if (!this.db) await this.init()
    const item = await this.getItem('analytics', id)
    if (item) {
      item.synced = true
      return this.putItem('analytics', item)
    }
  }

  // Cache storage
  async cacheData(key: string, data: any, type = 'cache'): Promise<void> {
    if (!this.db) await this.init()
    
    const item: StoredItem = {
      id: key,
      data: data,
      timestamp: Date.now(),
      type: type as any,
      synced: true
    }
    
    return this.putItem('cache', item)
  }

  async getCachedData(key: string): Promise<any> {
    if (!this.db) await this.init()
    const item = await this.getItem('cache', key)
    return item?.data || null
  }

  async clearExpiredCache(maxAge = 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init()
    const cutoff = Date.now() - maxAge
    return this.deleteByIndex('cache', 'timestamp', cutoff, 'prev')
  }

  // Sync queue management
  async addToSyncQueue(action: 'create' | 'update' | 'delete', endpoint: string, data: any): Promise<void> {
    if (!this.db) await this.init()
    
    const item: QueueItem = {
      id: this.generateId(),
      action,
      endpoint,
      data,
      timestamp: Date.now(),
      retries: 0
    }
    
    return this.putItem('sync_queue', item)
  }

  async getSyncQueue(): Promise<QueueItem[]> {
    if (!this.db) await this.init()
    return this.getAllItems('sync_queue')
  }

  async removeSyncQueueItem(id: string): Promise<void> {
    if (!this.db) await this.init()
    return this.deleteItem('sync_queue', id)
  }

  async incrementSyncRetries(id: string): Promise<void> {
    if (!this.db) await this.init()
    const item = await this.getItem('sync_queue', id) as QueueItem
    if (item) {
      item.retries += 1
      return this.putItem('sync_queue', item)
    }
  }

  // User data storage
  async saveUserData(key: string, data: any): Promise<void> {
    if (!this.db) await this.init()
    
    const item: StoredItem = {
      id: key,
      data: data,
      timestamp: Date.now(),
      type: 'user_data',
      synced: false
    }
    
    return this.putItem('user_data', item)
  }

  async getUserData(key: string): Promise<any> {
    if (!this.db) await this.init()
    const item = await this.getItem('user_data', key)
    return item?.data || null
  }

  // Generic storage operations
  private async putItem(storeName: string, item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(item)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  private async getItem(storeName: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  private async getAllItems(storeName: string, limit?: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll(limit)
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  private async deleteItem(storeName: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  private async deleteByIndex(
    storeName: string, 
    indexName: string, 
    value: any, 
    direction: 'next' | 'prev' = 'next'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      
      const range = direction === 'next' 
        ? IDBKeyRange.upperBound(value)
        : IDBKeyRange.lowerBound(value)
      
      const request = index.openCursor(range)
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          cursor.delete()
          cursor.continue()
        } else {
          resolve()
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  async getStorageUsage(): Promise<{ used: number; quota: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        quota: estimate.quota || 0
      }
    }
    return { used: 0, quota: 0 }
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init()
    
    const storeNames = ['assessments', 'analytics', 'cache', 'sync_queue', 'user_data']
    
    for (const storeName of storeNames) {
      await this.clearStore(storeName)
    }
  }

  private async clearStore(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'))
        return
      }
      
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

// Create singleton instance
export const offlineStorage = new OfflineStorage()

// Sync manager
export class SyncManager {
  private storage = offlineStorage
  private isOnline = navigator.onLine
  private syncInProgress = false

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.syncAll()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  async syncAll(): Promise<void> {
    if (!this.isOnline || this.syncInProgress) return
    
    this.syncInProgress = true
    
    try {
      await this.syncQueue()
      await this.syncAssessments()
      await this.syncAnalytics()
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      this.syncInProgress = false
    }
  }

  private async syncQueue(): Promise<void> {
    const queue = await this.storage.getSyncQueue()
    
    for (const item of queue) {
      if (item.retries >= 3) {
        await this.storage.removeSyncQueueItem(item.id)
        continue
      }
      
      try {
        const response = await fetch(item.endpoint, {
          method: item.action === 'delete' ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: item.action !== 'delete' ? JSON.stringify(item.data) : undefined
        })
        
        if (response.ok) {
          await this.storage.removeSyncQueueItem(item.id)
        } else {
          await this.storage.incrementSyncRetries(item.id)
        }
      } catch (error) {
        await this.storage.incrementSyncRetries(item.id)
      }
    }
  }

  private async syncAssessments(): Promise<void> {
    const assessments = await this.storage.getAssessments()
    const unsynced = assessments.filter(item => !item.synced)
    
    for (const assessment of unsynced) {
      try {
        const response = await fetch('/api/assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(assessment.data)
        })
        
        if (response.ok) {
          assessment.synced = true
          await this.storage.saveAssessment(assessment.data)
        }
      } catch (error) {
        console.error('Failed to sync assessment:', error)
      }
    }
  }

  private async syncAnalytics(): Promise<void> {
    const events = await this.storage.getAnalyticsEvents()
    const unsynced = events.filter(item => !item.synced)
    
    for (const event of unsynced) {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event.data)
        })
        
        if (response.ok) {
          await this.storage.markAnalyticsSynced(event.id)
        }
      } catch (error) {
        console.error('Failed to sync analytics:', error)
      }
    }
  }
}

// Initialize sync manager
export const syncManager = new SyncManager()

// React hook for offline storage
export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [storageUsage, setStorageUsage] = useState({ used: 0, quota: 0 })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Get storage usage
    offlineStorage.getStorageUsage().then(setStorageUsage)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const saveOffline = async (type: string, data: any) => {
    switch (type) {
      case 'assessment':
        await offlineStorage.saveAssessment(data)
        break
      case 'analytics':
        await offlineStorage.saveAnalyticsEvent(data)
        break
      case 'user_data':
        await offlineStorage.saveUserData(data.key, data.value)
        break
      default:
        await offlineStorage.cacheData(data.key, data.value)
    }
    
    if (!isOnline) {
      await offlineStorage.addToSyncQueue('create', `/api/${type}`, data)
    }
  }

  const getOfflineData = async (type: string, key?: string) => {
    switch (type) {
      case 'assessments':
        return await offlineStorage.getAssessments()
      case 'assessment':
        return key ? await offlineStorage.getAssessment(key) : null
      case 'analytics':
        return await offlineStorage.getAnalyticsEvents()
      case 'user_data':
        return key ? await offlineStorage.getUserData(key) : null
      case 'cache':
        return key ? await offlineStorage.getCachedData(key) : null
      default:
        return null
    }
  }

  return {
    isOnline,
    storageUsage,
    saveOffline,
    getOfflineData,
    syncAll: () => syncManager.syncAll(),
    clearStorage: () => offlineStorage.clearAllData()
  }
}
