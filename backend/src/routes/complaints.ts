import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();
import { Router } from 'express'; import { supabase } from '../lib/supabase'; const router = Router(); router.get('/', async (req, res) => { const tenantId = req.headers['x-tenant-id'] as string; const { data, error } = await supabase.from('complaints').select('*').eq('tenant_id', tenantId).order('created_at', { ascending: false }); if (error) return res.status(500).json({ error: error.message }); res.json(data); }); router.post('/', async (req, res) => { const tenantId = req.headers['x-tenant-id'] as string; const { data, error } = await supabase.from('complaints').insert({ ...req.body, tenant_id: tenantId }).select().single(); if (error) return res.status(500).json({ error: error.message }); res.status(201).json(data); }); router.get('/:id', async (req, res) => { const { data, error } = await supabase.from('complaints').select('*').eq('id', req.params.id).single(); if (error) return res.status(404).json({ error: error.message }); res.json(data); }); router.patch('/:id', async (req, res) => { const { data, error } = await supabase.from('complaints').update(req.body).eq('id', req.params.id).select().single(); if (error) return res.status(500).json({ error: error.message }); res.json(data); }); export default router;
router.get('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('complaints').select('*').eq('tenant_id', tenantId).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('complaints').insert({ ...req.body, tenant_id: tenantId }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('complaints').select('*, complaint_timeline(*), complaint_documents(*)').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

router.patch('/:id', async (req, res) => {
  const { data, error } = await supabase.from('complaints').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
