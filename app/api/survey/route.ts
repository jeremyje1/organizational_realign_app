import { NextResponse }   from 'next/server'
import { supabase }       from '@/lib/supabase-cookies'

export async function POST (req: Request) {
  const { workspace_id, user_id, data } = await req.json()

  const { error } = await supabase.from('surveys').insert([
    { workspace_id, user_id, data }
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}