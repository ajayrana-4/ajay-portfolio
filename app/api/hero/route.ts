import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Hero } from '@/lib/models/Hero';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectDB();
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    return NextResponse.json(hero);
  } catch (error) {
    console.error('GET /api/hero error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(body);
    } else {
      hero = await Hero.findOneAndUpdate({}, body, { new: true });
    }
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero' }, { status: 500 });
  }
}
