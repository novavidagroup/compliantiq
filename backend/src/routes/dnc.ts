import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

router.get('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('dnc_list').select('*').eq('tenant_id', tenantId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const { data, error } = await supabase.from('dnc_list').insert({ ...req.body, tenant_id: tenantId }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('dnc_list').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});
export default router;
