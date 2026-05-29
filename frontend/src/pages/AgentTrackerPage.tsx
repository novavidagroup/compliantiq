import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AgentTrackerPage() {
  const [agents, setAgents] = useState([])
    const [loading, setLoading] = useState(true)

      useEffect(() => {
          supabase.from('agents').select('*').order('name')
                .then(({ data }) => { setAgents(data || []); setLoading(false) })
                  }, [])

                    return (
                        <div className="p-8">
                              <h1 className="text-2xl font-bold text-gray-900 mb-6">Agent Tracker</h1>
                                    {loading ? <div className="text-gray-500">Loading...</div> : (
                                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                      <table className="w-full">
                                                                  <thead className="bg-gray-50">
                                                                                <tr>
                                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                                                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                                                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                                                                                                              </tr>
                                                                                                                                                          </thead>
                                                                                                                                                                      <tbody className="divide-y divide-gray-100">
                                                                                                                                                                                    {agents.length === 0 ? (
                                                                                                                                                                                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No agents found.</td></tr>
                                                                                                                                                                                                                  ) : agents.map(a => (
                                                                                                                                                                                                                                  <tr key={a.id} className="hover:bg-gray-50">
                                                                                                                                                                                                                                                    <td className="px-6 py-4"><Link to={`/agents/${a.id}`} className="text-blue-600 hover:underline text-sm font-medium">{a.name}</Link></td>
                                                                                                                                                                                                                                                                      <td className="px-6 py-4 text-sm text-gray-500">{a.email || ''}</td>
                                                                                                                                                                                                                                                                                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${a.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{a.active ? 'Active' : 'Inactive'}</span></td>
                                                                                                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                                                                  </tbody>
                                                                                                                                                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                                                                                                                                                }