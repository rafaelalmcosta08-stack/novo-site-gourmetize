import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export interface LeadItem {
  id: string
  restaurante: string
  contato: string
  email: string
  telefone: string
  segmento: string
  faturamento: string
  servico: string
  data: string
  timestamp: number
  status: 'Novo' | 'Já contatado' | 'Convertido em lead'
  plano?: string
  dias?: number
  crmStage?: string
  origem?: 'Instagram Ads' | 'Google Ads' | 'Indicação' | 'Orgânico / Site' | 'Outros'
  tempoParadoDias?: number
  desconto?: number
  valorMensal?: number
  motivoCancelamento?: string
  tarefaPendente?: any
}

// In-memory + file backup
const FILE_PATH = path.join(process.cwd(), "data_leads_store.json")

function readLeadsFromFile(): LeadItem[] {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const raw = fs.readFileSync(FILE_PATH, "utf-8")
      return JSON.parse(raw)
    }
  } catch (err) {
    console.error("Error reading leads file:", err)
  }
  return []
}

function writeLeadsToFile(leads: LeadItem[]) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), "utf-8")
  } catch (err) {
    console.error("Error writing leads file:", err)
  }
}

let serverLeadsCache: LeadItem[] = readLeadsFromFile()

export async function GET() {
  serverLeadsCache = readLeadsFromFile()
  return NextResponse.json({ success: true, leads: serverLeadsCache })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body || !body.restaurante) {
      return NextResponse.json({ success: false, error: "Dados inválidos" }, { status: 400 })
    }

    const currentLeads = readLeadsFromFile()

    // Check if lead with same ID or email+restaurante already exists
    const existingIndex = currentLeads.findIndex((l) => l.id === body.id)
    
    let updatedLeads: LeadItem[]
    if (existingIndex >= 0) {
      currentLeads[existingIndex] = { ...currentLeads[existingIndex], ...body }
      updatedLeads = currentLeads
    } else {
      updatedLeads = [body, ...currentLeads]
    }

    serverLeadsCache = updatedLeads
    writeLeadsToFile(updatedLeads)

    return NextResponse.json({ success: true, lead: body, total: updatedLeads.length })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, crmStage, status } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "ID é obrigatório" }, { status: 400 })
    }

    const currentLeads = readLeadsFromFile()
    const updatedLeads = currentLeads.map((l) => {
      if (l.id === id) {
        return {
          ...l,
          ...(crmStage ? { crmStage } : {}),
          ...(status ? { status } : {}),
        }
      }
      return l
    })

    serverLeadsCache = updatedLeads
    writeLeadsToFile(updatedLeads)

    return NextResponse.json({ success: true, leads: updatedLeads })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    let updatedLeads: LeadItem[]
    if (id) {
      const currentLeads = readLeadsFromFile()
      updatedLeads = currentLeads.filter((l) => l.id !== id)
    } else {
      updatedLeads = []
    }

    serverLeadsCache = updatedLeads
    writeLeadsToFile(updatedLeads)

    return NextResponse.json({ success: true, leads: updatedLeads })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
