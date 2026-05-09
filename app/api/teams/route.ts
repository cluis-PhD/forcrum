import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const teams = await db.getByPrefix('team:');
    return NextResponse.json({ success: true, teams });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, courseId, members } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome da equipa é obrigatório' }, { status: 400 });
    }

    const teamId = Date.now().toString();
    const team = {
      id: teamId,
      name: name.trim(),
      courseId: courseId || '',
      members: members || [],
      createdAt: new Date().toISOString(),
    };

    await db.set(`team:${teamId}`, team);
    return NextResponse.json({ success: true, team }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
