import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sprint = await db.get(`sprint:${params.id}`);
    if (!sprint) {
      return NextResponse.json({ error: 'Sprint não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, sprint });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const existing = await db.get(`sprint:${params.id}`);

    if (!existing) {
      return NextResponse.json({ error: 'Sprint não encontrado' }, { status: 404 });
    }

    const updated = {
      ...existing,
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
    };

    await db.set(`sprint:${params.id}`, updated);
    return NextResponse.json({ success: true, sprint: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.del(`sprint:${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
