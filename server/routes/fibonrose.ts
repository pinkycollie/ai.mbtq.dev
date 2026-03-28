import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { fibonrose } from '../../services/fibonrose/index.js';

const router = Router();

router.get('/health/:nodeId', async (req: Request, res: Response) => {
  const status = await fibonrose.checkNodeHealth(req.params.nodeId);
  res.json({ nodeId: req.params.nodeId, status });
});

router.post('/deploy', async (req: Request, res: Response) => {
  try {
    const { nodeId, config } = z.object({ nodeId: z.string(), config: z.any() }).parse(req.body);
    const success = await fibonrose.deployToNode(nodeId, config);
    res.json({ success, nodeId });
  } catch (error) {
    res.status(400).json({ error: 'Deployment failed' });
  }
});

export default router;
