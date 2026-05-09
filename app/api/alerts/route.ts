import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const alerts = await db.getByPrefix('alert:');
    return NextResponse.json({ success: true, alerts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, message, priority, courseId, targetStudentId } = body;

    const alertId = Date.now().toString();
    const alert = {
      id: alertId,
      title: title || '',
      message: message || '',
      priority: priority || 'normal',
      courseId: courseId || '',
      targetStudentId: targetStudentId || null,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await db.set(`alert:${alertId}`, alert);
    return NextResponse.json({ success: true, alert }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
