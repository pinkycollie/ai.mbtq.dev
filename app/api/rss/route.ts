/**
 * RSS Feed Aggregator API
 * 
 * Aggregates content from Deaf-related blogs, research articles,
 * and accessibility resources into an accessible feed.
 */

import { NextResponse } from "next/server"

export interface RSSFeedItem {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  category: string
  source: string
  hasVideo: boolean
  hasCaptions: boolean
  hasSignLanguage: boolean
  language: string
}

export interface RSSFeedSource {
  name: string
  url: string
  category: "news" | "research" | "community" | "technology" | "education"
  language: string
}

// Deaf-related RSS feed sources
const feedSources: RSSFeedSource[] = [
  {
    name: "NAD News",
    url: "https://www.nad.org/feed/",
    category: "news",
    language: "en",
  },
  {
    name: "Gallaudet University",
    url: "https://www.gallaudet.edu/news/feed/",
    category: "education",
    language: "en",
  },
  {
    name: "World Federation of the Deaf",
    url: "https://wfdeaf.org/feed/",
    category: "community",
    language: "en",
  },
  {
    name: "Sign Language Research",
    url: "https://jdsde.oxfordjournals.org/rss/",
    category: "research",
    language: "en",
  },
  {
    name: "Deaf Tech News",
    url: "https://deaftechnews.com/feed/",
    category: "technology",
    language: "en",
  },
]

/**
 * Parse RSS/Atom XML to feed items
 * @param xml - Raw XML string
 * @param source - RSS feed source configuration
 * @returns Parsed RSS feed items
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseRSSXML(xml: string, source: RSSFeedSource): RSSFeedItem[] {
  const items: RSSFeedItem[] = []
  
  // Simple XML parsing (in production, use a proper XML parser)
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  
  for (const itemXml of itemMatches.slice(0, 10)) {
    const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/i)?.[1] || 
                  itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/i)?.[2] || ""
    const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/i)?.[1] ||
                        itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/i)?.[2] || ""
    const link = itemXml.match(/<link>(.*?)<\/link>/i)?.[1] || ""
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || new Date().toISOString()
    
    // Check for accessibility indicators in content
    const hasVideo = /<video|youtube|vimeo/i.test(description + itemXml)
    const hasCaptions = /caption|subtitle|cc/i.test(description + itemXml)
    const hasSignLanguage = /sign language|asl|bsl|interpreter/i.test(description + itemXml)
    
    items.push({
      id: `${source.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${items.length}`,
      title: cleanHTML(title),
      description: cleanHTML(description).substring(0, 300),
      link,
      pubDate,
      category: source.category,
      source: source.name,
      hasVideo,
      hasCaptions,
      hasSignLanguage,
      language: source.language,
    })
  }
  
  return items
}

/**
 * Clean HTML tags from string
 */
function cleanHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim()
}

/**
 * Generate sample feed items for demonstration
 */
function generateSampleFeed(): RSSFeedItem[] {
  return [
    {
      id: "sample-1",
      title: "New AI Technology Advances Sign Language Recognition",
      description: "Researchers have developed a new machine learning model that can recognize sign language with 95% accuracy, marking a significant breakthrough for Deaf accessibility.",
      link: "https://example.com/ai-sign-language",
      pubDate: new Date().toISOString(),
      category: "technology",
      source: "AI Accessibility News",
      hasVideo: true,
      hasCaptions: true,
      hasSignLanguage: true,
      language: "en",
    },
    {
      id: "sample-2",
      title: "WCAG 2.2 Updates Focus on Deaf Accessibility",
      description: "The latest WCAG guidelines include enhanced requirements for video captions and sign language interpretation, improving web accessibility for Deaf users.",
      link: "https://example.com/wcag-updates",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      category: "news",
      source: "Accessibility Standards",
      hasVideo: false,
      hasCaptions: false,
      hasSignLanguage: false,
      language: "en",
    },
    {
      id: "sample-3",
      title: "Gallaudet University Launches Online ASL Course",
      description: "The world-renowned university for Deaf education has launched a comprehensive online American Sign Language course accessible to learners worldwide.",
      link: "https://example.com/gallaudet-asl",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      category: "education",
      source: "Education News",
      hasVideo: true,
      hasCaptions: true,
      hasSignLanguage: true,
      language: "en",
    },
    {
      id: "sample-4",
      title: "World Federation of the Deaf Annual Report 2024",
      description: "The WFD has released its annual report highlighting achievements in advocating for Deaf rights and sign language recognition worldwide.",
      link: "https://example.com/wfd-report",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      category: "community",
      source: "WFD",
      hasVideo: false,
      hasCaptions: false,
      hasSignLanguage: false,
      language: "en",
    },
    {
      id: "sample-5",
      title: "Study: Early Sign Language Exposure Benefits All Children",
      description: "New research shows that early exposure to sign language improves cognitive development in both Deaf and hearing children.",
      link: "https://example.com/research-study",
      pubDate: new Date(Date.now() - 345600000).toISOString(),
      category: "research",
      source: "Journal of Deaf Studies",
      hasVideo: true,
      hasCaptions: true,
      hasSignLanguage: false,
      language: "en",
    },
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const accessible = searchParams.get("accessible") === "true"
  const limit = parseInt(searchParams.get("limit") || "20", 10)

  try {
    // In production, this would fetch from actual RSS feeds
    // For now, return sample data
    let items = generateSampleFeed()

    // Filter by category
    if (category) {
      items = items.filter((item) => item.category === category)
    }

    // Filter for accessible content only
    if (accessible) {
      items = items.filter((item) => item.hasCaptions || item.hasSignLanguage)
    }

    // Apply limit
    items = items.slice(0, limit)

    return NextResponse.json({
      success: true,
      count: items.length,
      sources: feedSources.map((s) => ({ name: s.name, category: s.category })),
      items,
      metadata: {
        lastUpdated: new Date().toISOString(),
        categories: ["news", "research", "community", "technology", "education"],
        accessibilityFilters: ["hasCaptions", "hasSignLanguage", "hasVideo"],
      },
    })
  } catch (error) {
    console.error("RSS feed error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch RSS feeds" },
      { status: 500 }
    )
  }
}

/**
 * Subscribe to feed updates (webhook registration)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { webhookUrl, categories, accessibleOnly } = body

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "webhookUrl is required" },
        { status: 400 }
      )
    }

    // In production, store subscription in database
    const subscriptionId = crypto.randomUUID()

    return NextResponse.json({
      success: true,
      subscriptionId,
      message: "Successfully subscribed to RSS feed updates",
      filters: {
        categories: categories || "all",
        accessibleOnly: accessibleOnly || false,
      },
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create subscription" },
      { status: 500 }
    )
  }
}
