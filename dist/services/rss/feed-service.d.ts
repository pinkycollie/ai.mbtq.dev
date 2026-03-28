/**
 * RSS Feed Service for Deaf Community Research
 * Curated feeds for accessibility awareness and Deaf community news
 */
import { z } from 'zod';
declare const RSSConfigSchema: z.ZodObject<{
    maxItemsPerFeed: z.ZodDefault<z.ZodNumber>;
    cacheDuration: z.ZodDefault<z.ZodNumber>;
    timeout: z.ZodDefault<z.ZodNumber>;
    userAgent: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
type RSSConfig = z.infer<typeof RSSConfigSchema>;
interface FeedItem {
    id: string;
    title: string;
    link: string;
    description: string;
    pubDate: Date;
    author?: string;
    categories?: string[];
    imageUrl?: string;
}
interface FeedSource {
    id: string;
    name: string;
    url: string;
    category: FeedCategory;
    description: string;
    language: string;
    lastUpdated?: Date;
}
type FeedCategory = 'deaf-news' | 'accessibility' | 'sign-language' | 'technology' | 'research' | 'education' | 'community';
interface AggregatedFeed {
    sources: FeedSource[];
    items: FeedItem[];
    lastUpdated: Date;
    totalItems: number;
}
/**
 * RSS Feed Service
 */
export declare class RSSFeedService {
    private config;
    private cache;
    private feeds;
    constructor(config?: Partial<RSSConfig>);
    /**
     * Get all curated feed sources
     */
    getSources(): FeedSource[];
    /**
     * Get sources by category
     */
    getSourcesByCategory(category: FeedCategory): FeedSource[];
    /**
     * Get all available categories
     */
    getCategories(): FeedCategory[];
    /**
     * Fetch a single feed
     */
    fetchFeed(sourceId: string): Promise<FeedItem[]>;
    /**
     * Fetch all feeds and aggregate
     */
    fetchAllFeeds(): Promise<AggregatedFeed>;
    /**
     * Fetch feeds by category
     */
    fetchByCategory(category: FeedCategory): Promise<AggregatedFeed>;
    /**
     * Search across all feeds
     */
    searchFeeds(query: string): Promise<FeedItem[]>;
    /**
     * Add a custom feed source
     */
    addCustomSource(source: Omit<FeedSource, 'id'>): FeedSource;
    /**
     * Remove a custom feed source
     */
    removeSource(sourceId: string): boolean;
    /**
     * Parse RSS feed from URL
     * In production, this would use rss-parser or similar
     */
    private parseFeed;
    /**
     * Generate mock feed items for development
     */
    private generateMockFeedItems;
    /**
     * Get cached items if still valid
     */
    private getFromCache;
    /**
     * Clear all cached data
     */
    clearCache(): void;
    /**
     * Get cache statistics
     */
    getCacheStats(): {
        size: number;
        sources: string[];
    };
}
export declare function getRSSService(config?: Partial<RSSConfig>): RSSFeedService;
export default RSSFeedService;
