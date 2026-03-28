import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { pinkFlow } from '../../services/pinkflow/index.js';

const router = Router();

const validateSchema = z.object({
  content: z.string(),
  type: z.enum(['url', 'code']).default('code'),
});

router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { content, type } = validateSchema.parse(req.body);
    const report = await pinkFlow.validateAccessibility(content, type);
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: 'Validation failed' });
  }
});

router.post('/fix', async (req: Request, res: Response) => {
  try {
    const { issue } = z.object({ issue: z.string() }).parse(req.body);
    const fix = await pinkFlow.generateFix(issue);
    res.json({ issue, fix });
  } catch (error) {
    res.status(400).json({ error: 'Failed to generate fix' });
  }
});

export default router;
