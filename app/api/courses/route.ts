import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const courses = await db.getByPrefix('course:');
    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
    }

    const courseId = Date.now().toString();
    const course = {
      id: courseId,
      name: name.trim(),
      description: description || '',
      createdAt: new Date().toISOString(),
    };

    await db.set(`course:${courseId}`, course);
    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
