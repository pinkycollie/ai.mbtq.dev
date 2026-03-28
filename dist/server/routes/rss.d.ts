declare const router: import("express-serve-static-core").Router;
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
export default router;
