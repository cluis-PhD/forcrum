import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const students = await db.getByPrefix('student:');
    return NextResponse.json({ success: true, students });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, courseId, teamId } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
    }

    const studentId = id || Date.now().toString();
    const student = {
      id: studentId,
      name: name.trim(),
      email: email || '',
      courseId: courseId || '',
      teamId: teamId || null,
      createdAt: new Date().toISOString(),
    };

    await db.set(`student:${studentId}`, student);
    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
