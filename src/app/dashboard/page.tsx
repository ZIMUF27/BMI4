"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BMIRecord {
  id: number
  weight: number
  height: number
  bmi_value: number
  record_date: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [bmiResult, setBmiResult] = useState<number | null>(null)
  const [history, setHistory] = useState<BMIRecord[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const fetchHistory = async () => {
    const res = await fetch("/api/bmi")
    if (res.ok) {
      const data = await res.json()
      setHistory(data)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const calculateBMI = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!weight || !height) return

    // Optimistic calc
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    const bmi = parseFloat((w / (h * h)).toFixed(2))
    setBmiResult(bmi)

    // Save
    const res = await fetch("/api/bmi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight: w, height: parseFloat(height) }),
    })

    if (res.ok) {
      fetchHistory()
      setWeight("")
      setHeight("")
    }
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return "Underweight (ผอม)"
    if (bmi < 23) return "Normal (ปกติ)"
    if (bmi < 25) return "Overweight (ท้วม)"
    return "Obese (อ้วน)"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">BMI Dashboard</h1>
          <div className="flex gap-4">
             <Link href="/reports" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                View Reports
             </Link>
             <button onClick={() => signOut({ callbackUrl: '/' })} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Logout
             </button>
          </div>
        </div>
        
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Calculate BMI</h2>
            <form onSubmit={calculateBMI} className="flex flex-col md:flex-row gap-4 md:items-end">
                <div className="w-full md:w-auto">
                    <label className="block text-sm text-gray-700">Weight (kg)</label>
                    <input 
                        type="number" step="0.1"
                        value={weight} onChange={e => setWeight(e.target.value)}
                        className="border p-2 rounded w-full md:w-32 text-black"
                        required
                    />
                </div>
                <div className="w-full md:w-auto">
                    <label className="block text-sm text-gray-700">Height (cm)</label>
                    <input 
                        type="number" step="0.1"
                        value={height} onChange={e => setHeight(e.target.value)}
                        className="border p-2 rounded w-full md:w-32 text-black"
                        required
                    />
                </div>
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Calculate & Save
                </button>
            </form>
            {bmiResult && (
                <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="text-lg font-medium text-black">BMI: {bmiResult}</p>
                    <p className="text-lg text-blue-800">Status: {getBMIStatus(bmiResult)}</p>
                </div>
            )}
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-4 text-black">History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(record.record_date).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.weight}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.height}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.bmi_value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  )
}
