import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, open: 0, overdue: 0, closed: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('complaints').select('*').order('created_at', { ascending: false })
      if (data) {
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        setStats({
          total: data.length,
          open: data.filter(c => c.status !== 'closed').length,
          overdue: data.filter(c => c.status !== 'closed' && c.due_date && new Date(c.due_date) < now).length,
          closed: data.filter(c => c.status === 'closed' && new Date(c.updated_at) >= monthStart).length,
        })
        setRecent(data.slice(0, 5))
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>

  const cards = [
    { label: 'Total', value: stats.total, bg: 'bg-blue-50', text: 'text-blue-700' },
    { label: 'Open', value: stats.open, bg: 'bg-yellow-50', text: 'text-yellow-700' },
    { label: 'Overdue', value: stats.overdue, bg: 'bg-red-50', text: 'text-red-700' },
    { label: 'Closed This Month', value: stats.closed, bg: 'bg-green-50', text: 'text-green-700' },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/complaints/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + New Complaint
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`rounded-xl p-6 border ${c.bg}`}>
            <p className="text-sm font-medium opacity-70">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.text}`}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Recent Complaints</h2>
          <Link to="/complaints" className="text-blue-600 text-sm hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No complaints yet. <Link to="/complaints/new" className="text-blue-600 hover:underline">Create one.</Link></div>
        ) : (
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
              {recent.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><Link to={`/complaints/${c.id}`} className="text-blue-600 hover:underline text-sm">{c.complaint_number}</Link></td>
                  <td className="px-6 py-4 text-sm text-gray-900">{c.consumer_name}</td>
                  <td className="px-6 py-4 text-sm">{c.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.due_date ? new Date(c.due_date).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
