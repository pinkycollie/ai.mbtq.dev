import { z } from 'zod';
declare const VideoConfigSchema: z.ZodObject<{
    maxDuration: z.ZodDefault<z.ZodNumber>;
    supportedFormats: z.ZodDefault<z.ZodArray<z.ZodString>>;
    outputFormat: z.ZodDefault<z.ZodString>;
    frameRate: z.ZodDefault<z.ZodNumber>;
    resolution: z.ZodDefault<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    enableSignDetection: z.ZodDefault<z.ZodBoolean>;
    enableCaptioning: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
type VideoConfig = z.infer<typeof VideoConfigSchema>;
export interface VideoProcessingResult {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    inputUrl: string;
    outputUrl?: string;
    signLanguageDetections?: SignDetection[];
    captions?: Caption[];
    metadata: VideoMetadata;
    processingTime?: number;
    error?: string;
}
interface SignDetection {
    timestamp: number;
    duration: number;
    sign: string;
    confidence: number;
    language: 'asl' | 'bsl' | 'other';
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
interface Caption {
    startTime: number;
    endTime: number;
    text: string;
    language: string;
}
interface VideoMetadata {
    duration: number;
    width: number;
    height: number;
    format: string;
    frameRate: number;
    fileSize: number;
}
export declare class VideoPipelineService {
    private config;
    private processingQueue;
    constructor(config?: Partial<VideoConfig>);
    private generateId;
    processVideo(inputUrl: string, options?: Partial<VideoConfig>): Promise<VideoProcessingResult>;
    private executeProcessing;
    private extractMetadata;
    private validateVideo;
    private detectSignLanguage;
    private generateCaptions;
    getStatus(jobId: string): VideoProcessingResult | undefined;
    getAllJobs(): VideoProcessingResult[];
    clearCompleted(): void;
}
export declare function getVideoPipeline(config?: Partial<VideoConfig>): VideoPipelineService;
export default VideoPipelineService;
