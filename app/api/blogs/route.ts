import { NextResponse } from 'next/server';
import { DUMMY_BLOGS } from '../../types/blog';

export async function GET() {
  // In a real app, fetch from DB here
  return NextResponse.json(DUMMY_BLOGS);
}
