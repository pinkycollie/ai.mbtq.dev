/**
 * RSS Feed Service for Deaf Community Research
 * Curated feeds for accessibility awareness and Deaf community news
 */

import { z } from 'zod'

// Configuration schema
const RSSConfigSchema = z.object({
  maxItemsPerFeed: z.number().default(20),
  cacheDuration: z.number().default(3600000), // 1 hour in ms
  timeout: z.number().default(10000), // 10 seconds
  userAgent: z.string().default('MBTQ AI Platform RSS Reader'),
})

type RSSConfig = z.infer<typeof RSSConfigSchema>

// Feed item type
interface FeedItem {
  id: string
  title: string
  link: string
  description: string
  pubDate: Date
  author?: string
  categories?: string[]
  imageUrl?: string
}

// Feed source type
interface FeedSource {
  id: string
  name: string
  url: string
  category: FeedCategory
  description: string
  language: string
  lastUpdated?: Date
}

// Feed categories for organization
type FeedCategory = 
  | 'deaf-news'
  | 'accessibility'
  | 'sign-language'
  | 'technology'
  | 'research'
  | 'education'
  | 'community'

// Aggregated feed response
interface AggregatedFeed {
  sources: FeedSource[]
  items: FeedItem[]
  lastUpdated: Date
  totalItems: number
}

// Curated feed sources for Deaf community
const CURATED_FEEDS: FeedSource[] = [
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
]

// Cache for feed data
interface CacheEntry {
  items: FeedItem[]
  timestamp: number
}

/**
 * RSS Feed Service
 */
export class RSSFeedService {
  private config: RSSConfig
  private cache: Map<string, CacheEntry>

  constructor(config: Partial<RSSConfig> = {}) {
    this.config = RSSConfigSchema.parse(config)
    this.cache = new Map()
  }

  /**
   * Get all curated feed sources
   */
  getSources(): FeedSource[] {
    return [...CURATED_FEEDS]
  }

  /**
   * Get sources by category
   */
  getSourcesByCategory(category: FeedCategory): FeedSource[] {
    return CURATED_FEEDS.filter(feed => feed.category === category)
  }

  /**
   * Get all available categories
   */
  getCategories(): FeedCategory[] {
    return [
      'deaf-news',
      'accessibility',
      'sign-language',
      'technology',
      'research',
      'education',
      'community',
    ]
  }

  /**
   * Fetch a single feed
   */
  async fetchFeed(sourceId: string): Promise<FeedItem[]> {
    const source = CURATED_FEEDS.find(f => f.id === sourceId)
    if (!source) {
      throw new Error(`Feed source not found: ${sourceId}`)
    }

    // Check cache
    const cached = this.getFromCache(sourceId)
    if (cached) {
      return cached
    }

    // Fetch and parse feed
    const items = await this.parseFeed(source)

    // Cache results
    this.cache.set(sourceId, {
      items,
      timestamp: Date.now(),
    })

    return items
  }

  /**
   * Fetch all feeds and aggregate
   */
  async fetchAllFeeds(): Promise<AggregatedFeed> {
    const allItems: FeedItem[] = []

    for (const source of CURATED_FEEDS) {
      try {
        const items = await this.fetchFeed(source.id)
        allItems.push(...items)
      } catch (error) {
        console.error(`Failed to fetch feed ${source.id}:`, error)
      }
    }

    // Sort by date (newest first)
    allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

    return {
      sources: CURATED_FEEDS,
      items: allItems.slice(0, this.config.maxItemsPerFeed * CURATED_FEEDS.length),
      lastUpdated: new Date(),
      totalItems: allItems.length,
    }
  }

  /**
   * Fetch feeds by category
   */
  async fetchByCategory(category: FeedCategory): Promise<AggregatedFeed> {
    const sources = this.getSourcesByCategory(category)
    const allItems: FeedItem[] = []

    for (const source of sources) {
      try {
        const items = await this.fetchFeed(source.id)
        allItems.push(...items)
      } catch (error) {
        console.error(`Failed to fetch feed ${source.id}:`, error)
      }
    }

    // Sort by date (newest first)
    allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

    return {
      sources,
      items: allItems.slice(0, this.config.maxItemsPerFeed * sources.length),
      lastUpdated: new Date(),
      totalItems: allItems.length,
    }
  }

  /**
   * Search across all feeds
   */
  async searchFeeds(query: string): Promise<FeedItem[]> {
    const aggregated = await this.fetchAllFeeds()
    const searchLower = query.toLowerCase()

    return aggregated.items.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      (item.categories || []).some(c => c.toLowerCase().includes(searchLower))
    )
  }

  /**
   * Add a custom feed source
   */
  addCustomSource(source: Omit<FeedSource, 'id'>): FeedSource {
    const id = `custom-${Date.now()}`
    const newSource: FeedSource = { ...source, id }
    CURATED_FEEDS.push(newSource)
    return newSource
  }

  /**
   * Remove a custom feed source
   */
  removeSource(sourceId: string): boolean {
    const index = CURATED_FEEDS.findIndex(f => f.id === sourceId)
    if (index > -1 && sourceId.startsWith('custom-')) {
      CURATED_FEEDS.splice(index, 1)
      this.cache.delete(sourceId)
      return true
    }
    return false
  }

  /**
   * Parse RSS feed from URL
   * In production, this would use rss-parser or similar
   */
  private async parseFeed(source: FeedSource): Promise<FeedItem[]> {
    // Mock data for development
    // In production, use rss-parser to fetch actual feeds
    return this.generateMockFeedItems(source)
  }

  /**
   * Generate mock feed items for development
   */
  private generateMockFeedItems(source: FeedSource): FeedItem[] {
    const now = new Date()
    const items: FeedItem[] = []

    const mockTitles: Record<FeedCategory, string[]> = {
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
    }

    const titles = mockTitles[source.category] || mockTitles['deaf-news']

    for (let i = 0; i < Math.min(titles.length, this.config.maxItemsPerFeed); i++) {
      items.push({
        id: `${source.id}-${i}`,
        title: titles[i],
        link: `${source.url}/article/${i}`,
        description: `${titles[i]}. Read more about the latest developments in the ${source.category.replace('-', ' ')} space.`,
        pubDate: new Date(now.getTime() - i * 86400000), // Each day older
        author: source.name,
        categories: [source.category],
      })
    }

    return items
  }

  /**
   * Get cached items if still valid
   */
  private getFromCache(sourceId: string): FeedItem[] | null {
    const entry = this.cache.get(sourceId)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > this.config.cacheDuration
    if (isExpired) {
      this.cache.delete(sourceId)
      return null
    }

    return entry.items
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; sources: string[] } {
    return {
      size: this.cache.size,
      sources: Array.from(this.cache.keys()),
    }
  }
}

// Singleton instance
let rssInstance: RSSFeedService | null = null

export function getRSSService(config?: Partial<RSSConfig>): RSSFeedService {
  if (!rssInstance) {
    rssInstance = new RSSFeedService(config)
  }
  return rssInstance
}

export default RSSFeedService
