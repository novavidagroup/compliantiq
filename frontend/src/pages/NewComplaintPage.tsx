import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function NewComplaintPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ consumer_name: '', consumer_phone: '', consumer_email: '', complaint_type: '', description: '', assigned_to: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const year = new Date().getFullYear()
    const { count } = await supabase.from('complaints').select('*', { count: 'exact', head: true })
    const num = String((count || 0) + 1).padStart(4, '0')
    const complaint_number = `MHA-${year}-${num}`
    const due_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const { data, error: err } = await supabase.from('complaints').insert([{ ...form, complaint_number, status: 'open', due_date, tenant_id: 'default' }]).select().single()
    if (err) { setError(err.message); setLoading(false) }
    else { navigate(`/complaints/${data.id}`) }
  }

  const field = (label: string, key: string, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
    </div>
  )

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Complaint</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {field('Consumer Name *', 'consumer_name')}
        {field('Consumer Phone', 'consumer_phone', 'tel')}
        {field('Consumer Email', 'consumer_email', 'email')}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
          <select value={form.complaint_type} onChange={e => setForm(f => ({ ...f, complaint_type: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Select type...</option>
            <option value="billing">Billing</option>
            <option value="service">Service</option>
            <option value="compliance">Compliance</option>
            <option value="dnc">DNC Violation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        {field('Assigned To', 'assigned_to')}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading || !form.consumer_name} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Saving...' : 'Create Complaint'}
          </button>
          <button type="button" onClick={() => navigate('/complaints')} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
