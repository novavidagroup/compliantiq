import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ComplaintsListPage() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('complaints').select('*').order('created_at', { ascending: false })
      setComplaints(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = complaints.filter((c) => {
    const matchSearch = search ? c.complaint_number?.toLowerCase().includes(search.toLowerCase()) || c.consumer_name?.toLowerCase().includes(search.toLowerCase()) : true
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
        <Link to="/complaints/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ New Complaint</Link>
      </div>
      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {loading ? <div className="text-gray-500">Loading...</div> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Consumer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No complaints found.</td></tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><Link to={`/complaints/${c.id}`} className="text-blue-600 hover:underline text-sm">{c.complaint_number}</Link></td>
                  <td className="px-6 py-4 text-sm text-gray-900">{c.consumer_name}</td>
                  <td className="px-6 py-4 text-sm">{c.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.due_date ? new Date(c.due_date).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
