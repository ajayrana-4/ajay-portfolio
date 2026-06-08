import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { About } from '@/lib/models/About';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    let about = await About.findOne();
    if (!about) {
      about = await About.create(body);
    } else {
      about = await About.findOneAndUpdate({}, body, { new: true });
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 });
  }
}
