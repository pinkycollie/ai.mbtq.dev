import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

export interface RSSFeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
  source: string;
  hasVideo: boolean;
  hasCaptions: boolean;
  hasSignLanguage: boolean;
  language: string;
}

const feedSources = [
  { name: "NAD News", category: "news", language: "en" },
  { name: "Gallaudet University", category: "education", language: "en" },
  { name: "World Federation of the Deaf", category: "community", language: "en" },
  { name: "Sign Language Research", category: "research", language: "en" },
  { name: "Deaf Tech News", category: "technology", language: "en" },
];

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
    }
  ];
}

router.get('/', (req: Request, res: Response) => {
  const category = req.query.category as string;
  const accessible = req.query.accessible === 'true';
  const limit = parseInt(req.query.limit as string || '20', 10);

  try {
    let items = generateSampleFeed();

    if (category) {
      items = items.filter((item) => item.category === category);
    }

    if (accessible) {
      items = items.filter((item) => item.hasCaptions || item.hasSignLanguage);
    }

    items = items.slice(0, limit);

    res.json({
      success: true,
      count: items.length,
      sources: feedSources.map((s) => ({ name: s.name, category: s.category })),
      items,
      metadata: {
        lastUpdated: new Date().toISOString(),
        categories: ["news", "research", "community", "technology", "education"],
        accessibilityFilters: ["hasCaptions", "hasSignLanguage", "hasVideo"],
      },
    });
  } catch (error) {
    console.error("RSS feed error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch RSS feeds" });
  }
});

router.post('/subscribe', (req: Request, res: Response) => {
  try {
    const { webhookUrl, categories, accessibleOnly } = req.body;

    if (!webhookUrl) {
      return res.status(400).json({ success: false, error: "webhookUrl is required" });
    }

    const subscriptionId = crypto.randomUUID();

    res.json({
      success: true,
      subscriptionId,
      message: "Successfully subscribed to RSS feed updates",
      filters: {
        categories: categories || "all",
        accessibleOnly: accessibleOnly || false,
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ success: false, error: "Failed to create subscription" });
  }
});

export default router;
