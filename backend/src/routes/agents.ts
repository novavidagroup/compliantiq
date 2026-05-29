import { Router } from 'express';import { Router } from 'express'; import { supabase } from '../lib/supabase'; const router = Router(); router.get('/', async (req, res) => { const tenantId = req.headers['x-tenant-id'] as string; const { data, error } = await supabase.from('agents').select('*').eq('tenant_id', tenantId).order('name'); if (error) return res.status(500).json({ error: error.message }); res.json(data); }); router.post('/', async (req, res) => { const tenantId = req.headers['x-tenant-id'] as string; const { data, error } = await supabase.from('agents').insert({ ...req.body, tenant_id: tenantId }).select().single(); if (error) return res.status(500).json({ error: error.message }); res.status(201).json(data); }); router.get('/:id', async (req, res) => { const { data, error } = await supabase.from('agents').select('*').eq('id', req.params.id).single(); if (error) return res.status(404).json({ error: error.message }); res.json(data); }); router.patch('/:id', async (req, res) => { const { data, error } = await supabase.from('agents').update(req.body).eq('id', req.params.id).select().single(); if (error) return res.status(500).json({ error: error.message }); res.json(data); }); export default router;
import { supabase } from '../lib/supabase';

const router = Router();

router.get('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('agents').select('*').eq('tenant_id', tenantId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('agents').insert({ ...req.body, tenant_id: tenantId }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.patch('/:id', async (req, res) => {
  const { data, error } = await supabase.from('agents').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
