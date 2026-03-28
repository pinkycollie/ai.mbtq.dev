import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { deafAuth } from '../../services/deaf-auth/index.js';

const router = Router();

const challengeSchema = z.object({
  userId: z.string().uuid(),
});

const verifySchema = z.object({
  userId: z.string().uuid(),
  challenge: z.string(),
  videoUrl: z.string().url(),
});

router.post('/challenge', async (req: Request, res: Response) => {
  try {
    const { userId } = challengeSchema.parse(req.body);
    const challenge = await deafAuth.createChallenge(userId);
    res.json({ success: true, challenge });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { userId, challenge, videoUrl } = verifySchema.parse(req.body);
    const result = await deafAuth.verifyVideo(challenge, videoUrl);

    if (result.verified) {
      await deafAuth.recordAuthAttempt(userId, 'success');
      res.json({ success: true, ...result });
    } else {
      await deafAuth.recordAuthAttempt(userId, 'failure');
      res.status(401).json({ success: false, ...result });
    }
  } catch (error) {
    res.status(400).json({ error: 'Verification failed' });
  }
});

export default router;
