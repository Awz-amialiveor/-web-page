import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Community Feedback Routes

// Get all feedbacks
app.get('/make-server-4453a53a/feedbacks', async (c) => {
  try {
    const feedbacks = await kv.getByPrefix('feedback:');
    
    // Sort by timestamp descending
    const sortedFeedbacks = feedbacks
      .map(item => item.value)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return c.json({ success: true, feedbacks: sortedFeedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a new feedback
app.post('/make-server-4453a53a/feedbacks', async (c) => {
  try {
    const body = await c.req.json();
    const { name, text, image } = body;
    
    if (!name || !text) {
      return c.json({ success: false, error: 'Name and text are required' }, 400);
    }
    
    const id = `feedback:${Date.now()}`;
    const feedback = {
      id,
      name,
      text,
      image: image || null,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(id, feedback);
    
    return c.json({ success: true, feedback });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete a feedback (optional, for moderation)
app.delete('/make-server-4453a53a/feedbacks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(id);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
