import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AgentDetailPage() {
  const { id } = useParams()
    const [agent, setAgent] = useState(null)
      const [complaints, setComplaints] = useState([])
        const [loading, setLoading] = useState(true)

          useEffect(() => {
              const load = async () => {
                    const [{ data: a }, { data: c }] = await Promise.all([
                            supabase.from('agents').select('*').eq('id', id).single(),
                                    supabase.from('complaints').select('*').eq('assigned_to', id).order('created_at', { ascending: false })
                                          ])
                                                setAgent(a)
                                                      setComplaints(c || [])
                                                            setLoading(false)
                                                                }
                                                                    load()
                                                                      }, [id])

                                                                        if (loading) return <div className="p-8 text-gray-500">Loading...</div>
                                                                          if (!agent) return <div className="p-8 text-red-500">Agent not found.</div>

                                                                            return (
                                                                                <div className="p-8 max-w-4xl">
                                                                                      <Link to="/agents" className="text-blue-600 hover:underline text-sm mb-6 block">Back</Link>
                                                                                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                                                                                                  <p className="text-gray-500 text-sm mb-8">{agent.email}</p>
                                                                                                        <h2 className="font-semibold text-gray-900 mb-4">Complaints ({complaints.length})</h2>
                                                                                                              {complaints.length === 0 ? (
                                                                                                                      <p className="text-gray-500">No complaints assigned.</p>
                                                                                                                            ) : (
                                                                                                                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                                                                                                              <table className="w-full">
                                                                                                                                                          <thead className="bg-gray-50">
                                                                                                                                                                        <tr>
                                                                                                                                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number</th>
                                                                                                                                                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Consumer</th>
                                                                                                                                                                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                  </thead>
                                                                                                                                                                                                                                                              <tbody className="divide-y divide-gray-100">
                                                                                                                                                                                                                                                                            {complaints.map(c => (
                                                                                                                                                                                                                                                                                            <tr key={c.id} className="hover:bg-gray-50">
                                                                                                                                                                                                                                                                                                              <td className="px-6 py-4"><Link to={`/complaints/${c.id}`} className="text-blue-600 hover:underline text-sm">{c.complaint_number}</Link></td>
                                                                                                                                                                                                                                                                                                                                <td className="px-6 py-4 text-sm text-gray-900">{c.consumer_name}</td>
                                                                                                                                                                                                                                                                                                                                                  <td className="px-6 py-4 text-sm">{c.status}</td>
                                                                                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                                                                                                                            </tbody>
                                                                                                                                                                                                                                                                                                                                                                                                      </table>
                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                    )}
                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                                                                                                                                                                          }