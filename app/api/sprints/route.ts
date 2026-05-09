import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const sprints = await db.getByPrefix('sprint:');
    return NextResponse.json({ success: true, sprints });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, goal, startDate, endDate, courseId, teamId } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome do sprint é obrigatório' }, { status: 400 });
    }

    const sprintId = Date.now().toString();
    const sprint = {
      id: sprintId,
      name: name.trim(),
      goal: goal || '',
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || '',
      courseId: courseId || '',
      teamId: teamId || null,
      status: 'planning',
      createdAt: new Date().toISOString(),
    };

    await db.set(`sprint:${sprintId}`, sprint);
    return NextResponse.json({ success: true, sprint }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
