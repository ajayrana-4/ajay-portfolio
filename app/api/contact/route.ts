import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/lib/models/Contact';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectDB();
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create(body);
    } else {
      contact = await Contact.findOneAndUpdate({}, body, { new: true });
    }
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}
