/* filepath: /lib/analysis/bundle-analyzer.ts */

export interface BundleStats {
  totalSize: number;
  gzippedSize: number;
  assets: BundleAsset[];
  chunks: BundleChunk[];
  modules: BundleModule[];
  warnings: string[];
  errors: string[];
  buildTime: number;
  optimization: OptimizationReport;
}

export interface BundleAsset {
  name: string;
  size: number;
  gzippedSize?: number;
  type: 'js' | 'css' | 'image' | 'font' | 'other';
  chunks: string[];
  cached: boolean;
}

export interface BundleChunk {
  id: string;
  name: string;
  size: number;
  modules: string[];
  parents: string[];
  children: string[];
  isAsync: boolean;
  isEntry: boolean;
}

export interface BundleModule {
  id: string;
  name: string;
  size: number;
  chunks: string[];
  issuer?: string;
  dependencies: string[];
  source?: string;
  optimized: boolean;
}

export interface OptimizationReport {
  treeshaking: {
    enabled: boolean;
    unusedExports: string[];
    sideEffects: string[];
  };
  compression: {
    enabled: boolean;
    algorithm: string;
    ratio: number;
  };
  minification: {
    enabled: boolean;
    deadCodeElimination: boolean;
    constantFolding: boolean;
  };
  codesplitting: {
    enabled: boolean;
    chunks: number;
    dynamicImports: number;
  };
  recommendations: OptimizationRecommendation[];
}

export interface OptimizationRecommendation {
  type: 'warning' | 'suggestion' | 'info';
  category: 'size' | 'performance' | 'caching' | 'splitting';
  description: string;
  impact: 'high' | 'medium' | 'low';
  solution: string;
  estimatedSavings?: number;
}

export interface PerformanceBudget {
  maxBundleSize: number;      // 250KB recommended
  maxChunkSize: number;       // 100KB recommended  
  maxAssetSize: number;       // 50KB recommended
  maxInitialChunks: number;   // 5 recommended
  maxAsyncChunks: number;     // 30 recommended
}

/**
 * Advanced Bundle Analyzer
 * Analyzes webpack bundle stats for performance optimization
 */
export class BundleAnalyzer {
  private budget: PerformanceBudget;
  private stats: BundleStats | null = null;

  constructor(budget?: Partial<PerformanceBudget>) {
    this.budget = {
      maxBundleSize: 250 * 1024,      // 250KB
      maxChunkSize: 100 * 1024,       // 100KB
      maxAssetSize: 50 * 1024,        // 50KB
      maxInitialChunks: 5,
      maxAsyncChunks: 30,
      ...budget,
    };
  }

  /**
   * Analyze webpack stats
   */
  analyzeStats(webpackStats: any): BundleStats {
    const startTime = Date.now();
    
    try {
      const assets = this.extractAssets(webpackStats);
      const chunks = this.extractChunks(webpackStats);
      const modules = this.extractModules(webpackStats);
      
      const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
      const gzippedSize = assets.reduce((sum, asset) => sum + (asset.gzippedSize || asset.size * 0.3), 0);
      
      const optimization = this.analyzeOptimization(webpackStats, assets, chunks, modules);
      const warnings = this.generateWarnings(assets, chunks, modules);
      const errors = webpackStats.errors || [];

      this.stats = {
        totalSize,
        gzippedSize,
        assets,
        chunks,
        modules,
        warnings,
        errors,
        buildTime: Date.now() - startTime,
        optimization,
      };

      return this.stats;
    } catch (error) {
      console.error('Bundle analysis failed:', error);
      throw new Error(`Bundle analysis failed: ${error}`);
    }
  }

  /**
   * Extract asset information
   */
  private extractAssets(stats: any): BundleAsset[] {
    if (!stats.assets) return [];

    return stats.assets.map((asset: any) => ({
      name: asset.name,
      size: asset.size,
      gzippedSize: asset.gzippedSize || undefined,
      type: this.getAssetType(asset.name),
      chunks: asset.chunks || [],
      cached: asset.cached || false,
    }));
  }

  /**
   * Extract chunk information
   */
  private extractChunks(stats: any): BundleChunk[] {
    if (!stats.chunks) return [];

    return stats.chunks.map((chunk: any) => ({
      id: chunk.id.toString(),
      name: chunk.name || `chunk-${chunk.id}`,
      size: chunk.size,
      modules: chunk.modules?.map((m: any) => m.name || m.id) || [],
      parents: chunk.parents?.map((p: any) => p.toString()) || [],
      children: chunk.children?.map((c: any) => c.toString()) || [],
      isAsync: !chunk.entry,
      isEntry: chunk.entry || false,
    }));
  }

  /**
   * Extract module information
   */
  private extractModules(stats: any): BundleModule[] {
    if (!stats.modules) return [];

    return stats.modules.map((module: any) => ({
      id: module.id?.toString() || module.name,
      name: module.name || module.id,
      size: module.size,
      chunks: module.chunks?.map((c: any) => c.toString()) || [],
      issuer: module.issuer?.name || module.issuer?.id,
      dependencies: module.dependencies?.map((d: any) => d.name || d.id) || [],
      source: module.source,
      optimized: module.optimized || false,
    }));
  }

  /**
   * Determine asset type from filename
   */
  private getAssetType(filename: string): BundleAsset['type'] {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return 'js';
      case 'css':
      case 'scss':
      case 'sass':
      case 'less':
        return 'css';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
      case 'webp':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'otf':
      case 'eot':
        return 'font';
      default:
        return 'other';
    }
  }

  /**
   * Analyze optimization strategies
   */
  private analyzeOptimization(
    stats: any,
    assets: BundleAsset[],
    chunks: BundleChunk[],
    modules: BundleModule[]
  ): OptimizationReport {
    const optimization = stats.optimization || {};
    
    const treeshaking = {
      enabled: optimization.usedExports || false,
      unusedExports: this.findUnusedExports(modules),
      sideEffects: this.findSideEffects(modules),
    };

    const compression = {
      enabled: assets.some(asset => asset.gzippedSize),
      algorithm: 'gzip', // Default assumption
      ratio: this.calculateCompressionRatio(assets),
    };

    const minification = {
      enabled: optimization.minimize || false,
      deadCodeElimination: optimization.usedExports || false,
      constantFolding: optimization.concatenateModules || false,
    };

    const codesplitting = {
      enabled: chunks.some(chunk => chunk.isAsync),
      chunks: chunks.length,
      dynamicImports: this.countDynamicImports(modules),
    };

    const recommendations = this.generateOptimizationRecommendations(
      assets,
      chunks,
      modules,
      { treeshaking, compression, minification, codesplitting }
    );

    return {
      treeshaking,
      compression,
      minification,
      codesplitting,
      recommendations,
    };
  }

  /**
   * Find unused exports in modules
   */
  private findUnusedExports(modules: BundleModule[]): string[] {
    // This would require more sophisticated analysis
    // For now, return empty array
    return [];
  }

  /**
   * Find modules with side effects
   */
  private findSideEffects(modules: BundleModule[]): string[] {
    return modules
      .filter(module => {
        // Simple heuristic: modules with no dependencies might have side effects
        return module.dependencies.length === 0 && module.size > 0;
      })
      .map(module => module.name);
  }

  /**
   * Calculate compression ratio
   */
  private calculateCompressionRatio(assets: BundleAsset[]): number {
    const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
    const totalGzipped = assets.reduce((sum, asset) => sum + (asset.gzippedSize || asset.size), 0);
    
    return totalSize > 0 ? (totalGzipped / totalSize) : 1;
  }

  /**
   * Count dynamic imports
   */
  private countDynamicImports(modules: BundleModule[]): number {
    return modules.filter(module => 
      module.source?.includes('import(') ||
      module.source?.includes('require.ensure') ||
      module.name.includes('lazy')
    ).length;
  }

  /**
   * Generate optimization recommendations
   */
  private generateOptimizationRecommendations(
    assets: BundleAsset[],
    chunks: BundleChunk[],
    modules: BundleModule[],
    optimization: Omit<OptimizationReport, 'recommendations'>
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Check bundle size
    const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
    if (totalSize > this.budget.maxBundleSize) {
      recommendations.push({
        type: 'warning',
        category: 'size',
        description: `Total bundle size (${this.formatBytes(totalSize)}) exceeds budget (${this.formatBytes(this.budget.maxBundleSize)})`,
        impact: 'high',
        solution: 'Enable code splitting, tree shaking, and remove unused dependencies',
        estimatedSavings: totalSize - this.budget.maxBundleSize,
      });
    }

    // Check large chunks
    chunks.forEach(chunk => {
      if (chunk.size > this.budget.maxChunkSize) {
        recommendations.push({
          type: 'warning',
          category: 'splitting',
          description: `Chunk "${chunk.name}" (${this.formatBytes(chunk.size)}) exceeds recommended size`,
          impact: 'medium',
          solution: 'Split this chunk into smaller pieces using dynamic imports',
          estimatedSavings: chunk.size - this.budget.maxChunkSize,
        });
      }
    });

    // Check large assets
    assets.forEach(asset => {
      if (asset.size > this.budget.maxAssetSize) {
        recommendations.push({
          type: 'suggestion',
          category: 'size',
          description: `Asset "${asset.name}" (${this.formatBytes(asset.size)}) is quite large`,
          impact: 'low',
          solution: asset.type === 'image' 
            ? 'Optimize images with compression or use modern formats (WebP, AVIF)'
            : 'Consider code splitting or lazy loading',
        });
      }
    });

    // Check compression
    if (!optimization.compression.enabled) {
      recommendations.push({
        type: 'suggestion',
        category: 'performance',
        description: 'Compression is not enabled',
        impact: 'medium',
        solution: 'Enable gzip or brotli compression on your server',
        estimatedSavings: totalSize * 0.7, // Estimate 70% savings
      });
    }

    // Check tree shaking
    if (!optimization.treeshaking.enabled) {
      recommendations.push({
        type: 'suggestion',
        category: 'size',
        description: 'Tree shaking is not enabled',
        impact: 'medium',
        solution: 'Enable tree shaking to remove unused code',
      });
    }

    // Check code splitting
    if (!optimization.codesplitting.enabled) {
      recommendations.push({
        type: 'suggestion',
        category: 'performance',
        description: 'Code splitting is not being used',
        impact: 'medium',
        solution: 'Implement code splitting with dynamic imports for better performance',
      });
    }

    // Check duplicate modules
    const duplicates = this.findDuplicateModules(modules);
    if (duplicates.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'size',
        description: `Found ${duplicates.length} duplicate modules`,
        impact: 'medium',
        solution: 'Use webpack-bundle-analyzer to identify and remove duplicate dependencies',
      });
    }

    return recommendations;
  }

  /**
   * Find duplicate modules
   */
  private findDuplicateModules(modules: BundleModule[]): BundleModule[] {
    const seen = new Set<string>();
    const duplicates: BundleModule[] = [];

    modules.forEach(module => {
      const normalizedName = module.name.replace(/\?.*$/, ''); // Remove query params
      if (seen.has(normalizedName)) {
        duplicates.push(module);
      } else {
        seen.add(normalizedName);
      }
    });

    return duplicates;
  }

  /**
   * Generate warnings based on analysis
   */
  private generateWarnings(
    assets: BundleAsset[],
    chunks: BundleChunk[],
    modules: BundleModule[]
  ): string[] {
    const warnings: string[] = [];

    // Check for too many chunks
    const initialChunks = chunks.filter(chunk => chunk.isEntry || !chunk.isAsync);
    if (initialChunks.length > this.budget.maxInitialChunks) {
      warnings.push(`Too many initial chunks (${initialChunks.length}), consider combining some`);
    }

    const asyncChunks = chunks.filter(chunk => chunk.isAsync);
    if (asyncChunks.length > this.budget.maxAsyncChunks) {
      warnings.push(`Too many async chunks (${asyncChunks.length}), might impact performance`);
    }

    // Check for missing source maps
    const hasSourceMaps = assets.some(asset => asset.name.endsWith('.map'));
    if (!hasSourceMaps) {
      warnings.push('No source maps found, debugging will be difficult');
    }

    // Check for old dependencies
    const suspiciousModules = modules.filter(module => 
      module.name.includes('node_modules') && 
      (module.name.includes('lodash') || module.name.includes('moment'))
    );
    
    if (suspiciousModules.length > 0) {
      warnings.push('Found potentially heavy dependencies (lodash, moment), consider alternatives');
    }

    return warnings;
  }

  /**
   * Format bytes to human readable format
   */
  private formatBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get current stats
   */
  getStats(): BundleStats | null {
    return this.stats;
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    if (!this.stats) {
      return 'No bundle analysis available';
    }

    const { totalSize, gzippedSize, assets, chunks, optimization } = this.stats;
    
    return `
Bundle Analysis Report
=====================

Size Summary:
- Total Size: ${this.formatBytes(totalSize)}
- Gzipped Size: ${this.formatBytes(gzippedSize)}
- Compression Ratio: ${(optimization.compression.ratio * 100).toFixed(1)}%

Assets (${assets.length}):
${assets.slice(0, 10).map(asset => 
  `- ${asset.name}: ${this.formatBytes(asset.size)} (${asset.type})`
).join('\n')}

Chunks (${chunks.length}):
${chunks.slice(0, 5).map(chunk => 
  `- ${chunk.name}: ${this.formatBytes(chunk.size)} (${chunk.isEntry ? 'entry' : 'async'})`
).join('\n')}

Optimization:
- Tree Shaking: ${optimization.treeshaking.enabled ? '✓' : '✗'}
- Minification: ${optimization.minification.enabled ? '✓' : '✗'}
- Code Splitting: ${optimization.codesplitting.enabled ? '✓' : '✗'}
- Compression: ${optimization.compression.enabled ? '✓' : '✗'}

Recommendations (${optimization.recommendations.length}):
${optimization.recommendations.slice(0, 5).map(rec => 
  `- ${rec.description}`
).join('\n')}
    `.trim();
  }

  /**
   * Export analysis data
   */
  exportAnalysis(): string {
    return JSON.stringify(this.stats, null, 2);
  }
}

// Export singleton instance
export const bundleAnalyzer = new BundleAnalyzer();
