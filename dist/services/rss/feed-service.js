/**
 * RSS Feed Service for Deaf Community Research
 * Curated feeds for accessibility awareness and Deaf community news
 */
import { z } from 'zod';
// Configuration schema
const RSSConfigSchema = z.object({
    maxItemsPerFeed: z.number().default(20),
    cacheDuration: z.number().default(3600000), // 1 hour in ms
    timeout: z.number().default(10000), // 10 seconds
    userAgent: z.string().default('MBTQ AI Platform RSS Reader'),
});
// Curated feed sources for Deaf community (default feeds)
const DEFAULT_CURATED_FEEDS = [
    {
        id: 'deaf-news-today',
        name: 'Deaf News Today',
        url: 'https://deafnewstoday.com/feed/',
        category: 'deaf-news',
        description: 'Latest news and stories from the Deaf community',
        language: 'en',
    },
    {
        id: 'nad-updates',
        name: 'National Association of the Deaf',
        url: 'https://www.nad.org/feed/',
        category: 'community',
        description: 'Updates from the National Association of the Deaf',
        language: 'en',
    },
    {
        id: 'gallaudet-news',
        name: 'Gallaudet University News',
        url: 'https://www.gallaudet.edu/rss/news',
        category: 'education',
        description: 'News and research from Gallaudet University',
        language: 'en',
    },
    {
        id: 'accessibility-tech',
        name: 'Accessibility Technology',
        url: 'https://www.accessibilitytechnews.com/feed/',
        category: 'technology',
        description: 'Technology news focused on accessibility',
        language: 'en',
    },
    {
        id: 'asl-research',
        name: 'ASL Research Updates',
        url: 'https://www.aslresearch.org/rss',
        category: 'research',
        description: 'Academic research on American Sign Language',
        language: 'en',
    },
    {
        id: 'sign-language-learning',
        name: 'Sign Language Learning Resources',
        url: 'https://www.signlanguagelearning.com/feed',
        category: 'sign-language',
        description: 'Resources and tips for learning sign language',
        language: 'en',
    },
    {
        id: 'deaf-accessibility',
        name: 'Deaf Accessibility News',
        url: 'https://www.deafaccessibility.org/feed',
        category: 'accessibility',
        description: 'News about accessibility for Deaf individuals',
        language: 'en',
    },
];
/**
 * RSS Feed Service
 */
export class RSSFeedService {
    config;
    cache;
    feeds;
    constructor(config = {}) {
        this.config = RSSConfigSchema.parse(config);
        this.cache = new Map();
        this.feeds = [...DEFAULT_CURATED_FEEDS];
    }
    /**
     * Get all curated feed sources
     */
    getSources() {
        return [...this.feeds];
    }
    /**
     * Get sources by category
     */
    getSourcesByCategory(category) {
        return this.feeds.filter(feed => feed.category === category);
    }
    /**
     * Get all available categories
     */
    getCategories() {
        return [
            'deaf-news',
            'accessibility',
            'sign-language',
            'technology',
            'research',
            'education',
            'community',
        ];
    }
    /**
     * Fetch a single feed
     */
    async fetchFeed(sourceId) {
        const source = this.feeds.find(f => f.id === sourceId);
        if (!source) {
            throw new Error(`Feed source not found: ${sourceId}`);
        }
        // Check cache
        const cached = this.getFromCache(sourceId);
        if (cached) {
            return cached;
        }
        // Fetch and parse feed
        const items = await this.parseFeed(source);
        // Cache results
        this.cache.set(sourceId, {
            items,
            timestamp: Date.now(),
        });
        return items;
    }
    /**
     * Fetch all feeds and aggregate
     */
    async fetchAllFeeds() {
        const allItems = [];
        for (const source of this.feeds) {
            try {
                const items = await this.fetchFeed(source.id);
                allItems.push(...items);
            }
            catch (error) {
                console.error(`Failed to fetch feed ${source.id}:`, error);
            }
        }
        // Sort by date (newest first)
        allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
        return {
            sources: this.feeds,
            items: allItems.slice(0, this.config.maxItemsPerFeed * this.feeds.length),
            lastUpdated: new Date(),
            totalItems: allItems.length,
        };
    }
    /**
     * Fetch feeds by category
     */
    async fetchByCategory(category) {
        const sources = this.getSourcesByCategory(category);
        const allItems = [];
        for (const source of sources) {
            try {
                const items = await this.fetchFeed(source.id);
                allItems.push(...items);
            }
            catch (error) {
                console.error(`Failed to fetch feed ${source.id}:`, error);
            }
        }
        // Sort by date (newest first)
        allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
        return {
            sources,
            items: allItems.slice(0, this.config.maxItemsPerFeed * sources.length),
            lastUpdated: new Date(),
            totalItems: allItems.length,
        };
    }
    /**
     * Search across all feeds
     */
    async searchFeeds(query) {
        const aggregated = await this.fetchAllFeeds();
        const searchLower = query.toLowerCase();
        return aggregated.items.filter(item => item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            (item.categories || []).some(c => c.toLowerCase().includes(searchLower)));
    }
    /**
     * Add a custom feed source
     */
    addCustomSource(source) {
        const id = `custom-${Date.now()}`;
        const newSource = { ...source, id };
        this.feeds.push(newSource);
        return newSource;
    }
    /**
     * Remove a custom feed source
     */
    removeSource(sourceId) {
        const index = this.feeds.findIndex(f => f.id === sourceId);
        if (index > -1 && sourceId.startsWith('custom-')) {
            this.feeds.splice(index, 1);
            this.cache.delete(sourceId);
            return true;
        }
        return false;
    }
    /**
     * Parse RSS feed from URL
     * In production, this would use rss-parser or similar
     */
    async parseFeed(source) {
        // Mock data for development
        // In production, use rss-parser to fetch actual feeds
        return this.generateMockFeedItems(source);
    }
    /**
     * Generate mock feed items for development
     */
    generateMockFeedItems(source) {
        const now = new Date();
        const items = [];
        const mockTitles = {
            'deaf-news': [
                'Breaking: New Legislation Expands Deaf Access Rights',
                'Deaf Community Celebrates International Day of Sign Languages',
                'Local Deaf School Receives Major Funding Grant',
            ],
            'accessibility': [
                'Web Accessibility Standards Updated for 2024',
                'Major Companies Commit to Full Accessibility',
                'New Accessibility Tools Released for Developers',
            ],
            'sign-language': [
                'Study: Sign Language Benefits All Children',
                'New ASL Dictionary App Launched',
                'Sign Language Interpretation Technology Advances',
            ],
            'technology': [
                'AI-Powered Sign Recognition Reaches New Milestone',
                'Smart Glasses for Real-Time Captioning Released',
                'Accessibility Features in Latest Smartphone Update',
            ],
            'research': [
                'Groundbreaking Research on Deaf Cognition Published',
                'Study Reveals Benefits of Bilingual Deaf Education',
                'New Understanding of Sign Language Brain Processing',
            ],
            'education': [
                'Universities Expand Deaf Studies Programs',
                'Online ASL Courses See Record Enrollment',
                'Educational Technology for Deaf Students Improves',
            ],
            'community': [
                'Deaf Community Center Opens in Major City',
                'Annual Deaf Festival Attracts Thousands',
                'Support Groups for Deaf Families Expand Nationwide',
            ],
        };
        const titles = mockTitles[source.category] || mockTitles['deaf-news'];
        for (let i = 0; i < Math.min(titles.length, this.config.maxItemsPerFeed); i++) {
            items.push({
                id: `${source.id}-${i}`,
                title: titles[i],
                link: `${source.url}/article/${i}`,
                description: `${titles[i]}. Read more about the latest developments in the ${source.category.replace('-', ' ')} space.`,
                pubDate: new Date(now.getTime() - i * 86400000), // Each day older
                author: source.name,
                categories: [source.category],
            });
        }
        return items;
    }
    /**
     * Get cached items if still valid
     */
    getFromCache(sourceId) {
        const entry = this.cache.get(sourceId);
        if (!entry)
            return null;
        const isExpired = Date.now() - entry.timestamp > this.config.cacheDuration;
        if (isExpired) {
            this.cache.delete(sourceId);
            return null;
        }
        return entry.items;
    }
    /**
     * Clear all cached data
     */
    clearCache() {
        this.cache.clear();
    }
    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            sources: Array.from(this.cache.keys()),
        };
    }
}
// Singleton instance
let rssInstance = null;
export function getRSSService(config) {
    if (!rssInstance) {
        rssInstance = new RSSFeedService(config);
    }
    return rssInstance;
}
export default RSSFeedService;
//# sourceMappingURL=feed-service.js.map