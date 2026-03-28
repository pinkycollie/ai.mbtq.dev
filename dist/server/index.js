import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { getLanguageModel } from '../services/ai/language-model.js';
import { getVideoPipeline } from '../services/ai/video-pipeline.js';
import rssRouter from './routes/rss.js';
import authRouter from './routes/auth.js';
import generatorRouter from './routes/generator.js';
import pinksyncRouter from './routes/pinksync.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// Auth Routes
app.use('/api/auth', authRouter);
// Code Generation Routes
app.use('/api/generate', generatorRouter);
// PinkSync Estimator Route
app.use('/api/pinksync', pinksyncRouter);
// AI Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt, language, context, taskType } = req.body;
        const llm = getLanguageModel();
        const result = await llm.generate({ prompt, language, context, taskType });
        res.json(result);
    }
    catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Video Processing Route
app.post('/api/video/process', async (req, res) => {
    try {
        const { url, options } = req.body;
        const pipeline = getVideoPipeline();
        const result = await pipeline.processVideo(url, options);
        res.json(result);
    }
    catch (error) {
        console.error('Video processing error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// RSS Routes
app.use('/api/rss', rssRouter);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`MBTQ Generative AI Platform Backend listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map