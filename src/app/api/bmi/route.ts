import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { weight, height } = await req.json()
    if (!weight || !height) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 })
    }

    const heightInM = parseFloat(height) / 100
    const bmiValue = parseFloat((parseFloat(weight) / (heightInM * heightInM)).toFixed(2))
    
    const record = await prisma.bMI_Record.create({
      data: {
        user_id: parseInt(session.user.id),
        weight: parseFloat(weight),
        height: parseFloat(height),
        bmi_value: bmiValue,
      }
    })

    return NextResponse.json(record)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error saving BMI" }, { status: 500 })
  }
}

export async function GET(req: Request) {
   const session = await getServerSession(authOptions)
   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
   
   try {
     const records = await prisma.bMI_Record.findMany({
       where: { user_id: parseInt(session.user.id) },
       orderBy: { record_date: 'desc' }
     })
     return NextResponse.json(records)
   } catch (error) {
     return NextResponse.json({ error: "Error fetching records" }, { status: 500 })
   }
}
