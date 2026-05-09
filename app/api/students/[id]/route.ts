import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await db.get(`student:${params.id}`);
    if (!student) {
      return NextResponse.json({ error: 'Formando não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, student });
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
    const existing = await db.get(`student:${params.id}`);

    if (!existing) {
      return NextResponse.json({ error: 'Formando não encontrado' }, { status: 404 });
    }

    const updated = {
      ...existing,
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
    };

    await db.set(`student:${params.id}`, updated);
    return NextResponse.json({ success: true, student: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.del(`student:${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
