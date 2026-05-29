import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function DNCListPage() {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const [phone, setPhone] = useState('')
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        supabase.from('dnc_list').select('*').order('created_at', { ascending: false })
            .then(({ data }) => { setEntries(data || []); setLoading(false) })
    }, [])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone) return
        setAdding(true)
        const { data } = await supabase.from('dnc_list').insert([{ phone, tenant_id: 'default' }]).select().single()
        if (data) setEntries(p => [data, ...p])
        setPhone('')
        setAdding(false)
    }

    const remove = async (id: string) => {
        await supabase.from('dnc_list').delete().eq('id', id)
        setEntries(p => p.filter(e => e.id !== id))
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">DNC List</h1>
            <form onSubmit={handleAdd} className="flex gap-4 mb-6">
                <input type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <button type="submit" disabled={adding || !phone} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">Add to DNC</button>
            </form>
            {loading ? <div className="text-gray-500">Loading...</div> : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Added</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entries.length === 0 ? (
                                <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No entries.</td></tr>
                            ) : entries.map(e => (
                                <tr key={e.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{e.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(e.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4"><button onClick={() => remove(e.id)} className="text-red-600 text-sm hover:text-red-800">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}