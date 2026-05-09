import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const stories = await db.getByPrefix('story:');
    return NextResponse.json({ success: true, stories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, sprintId, courseId, priority, estimate } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Título é obrigatório' }, { status: 400 });
    }

    const storyId = Date.now().toString();
    const story = {
      id: storyId,
      title: title.trim(),
      description: description || '',
      sprintId: sprintId || null,
      courseId: courseId || '',
      priority: priority || 'medium',
      estimate: estimate || 0,
      status: 'backlog',
      createdAt: new Date().toISOString(),
    };

    await db.set(`story:${storyId}`, story);
    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
