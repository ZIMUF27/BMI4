"use client"

import { useState, useEffect } from "react"
import BMIChart from "@/components/BMIChart"
import Link from "next/link"

interface BMIRecord {
  id: number
  bmi_value: number
  record_date: string
}

export default function ReportsPage() {
  const [records, setRecords] = useState<BMIRecord[]>([])
  const [view, setView] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")

  useEffect(() => {
    fetch("/api/bmi")
      .then(res => res.json())
      .then(data => {
          // Sort by date asc
          if (Array.isArray(data)) {
            data.sort((a, b) => new Date(a.record_date).getTime() - new Date(b.record_date).getTime())
            setRecords(data)
          }
      })
  }, [])

  const getAggregatedData = () => {
    const map = new Map<string, { sum: number, count: number }>()

    records.forEach(r => {
      const date = new Date(r.record_date)
      let key = ""
      if (view === "daily") key = date.toISOString().split('T')[0]
      else if (view === "weekly") {
         // Simple week key: YYYY-Www
         const onejan = new Date(date.getFullYear(), 0, 1);
         const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
         key = `${date.getFullYear()}-W${week}`
      }
      else if (view === "monthly") key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      else if (view === "yearly") key = `${date.getFullYear()}`

      const current = map.get(key) || { sum: 0, count: 0 }
      map.set(key, { sum: current.sum + r.bmi_value, count: current.count + 1 })
    })

    const result: { label: string, value: number }[] = []
    map.forEach((val, key) => {
      result.push({ label: key, value: parseFloat((val.sum / val.count).toFixed(2)) })
    })
    
    // Sort keys
    result.sort((a, b) => a.label.localeCompare(b.label))

    return result
  }

  const chartData = getAggregatedData()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">MIS Reports</h1>
          <Link href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Back to Dashboard
          </Link>
        </div>

        <div className="flex gap-2 mb-6">
            {["daily", "weekly", "monthly", "yearly"].map((v) => (
                <button 
                    key={v}
                    onClick={() => setView(v as any)}
                    className={`px-4 py-2 rounded capitalize ${view === v ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {v}
                </button>
            ))}
        </div>

        <div className="bg-white p-4 border rounded">
            <BMIChart data={chartData} label={`Average BMI (${view})`} />
        </div>
      </div>
    </div>
  )
}
