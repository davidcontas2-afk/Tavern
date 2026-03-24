import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'components', 'SetupVar12.tsx');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new NextResponse('Error reading file', { status: 500 });
  }
}
