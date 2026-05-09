import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const messages = await db.getByPrefix('message:');
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to, subject, body: messageBody } = body;

    const messageId = Date.now().toString();
    const message = {
      id: messageId,
      from: from || '',
      to: to || '',
      subject: subject || '',
      body: messageBody || '',
      read: false,
      createdAt: new Date().toISOString(),
    };

    await db.set(`message:${messageId}`, message);
    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
