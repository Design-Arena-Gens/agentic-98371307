import { NextResponse } from 'next/server';
import { generateManuscript } from '@/lib/agent';
import { ManuscriptInputs } from '@/lib/types';

const REQUIRED_FIELDS: (keyof ManuscriptInputs)[] = [
  'workingTitle',
  'coreIdea',
  'audience',
  'tone',
  'targetPages'
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ManuscriptInputs>;

    for (const field of REQUIRED_FIELDS) {
      const value = payload[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim().length === 0)
      ) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const normalized: ManuscriptInputs = {
      workingTitle: payload.workingTitle!.trim(),
      coreIdea: payload.coreIdea!.trim(),
      audience: payload.audience!.trim(),
      tone: payload.tone!.trim(),
      targetPages: Number(payload.targetPages)
    };

    if (Number.isNaN(normalized.targetPages)) {
      return NextResponse.json(
        { error: 'targetPages must be a number between 10 and 30' },
        { status: 400 }
      );
    }

    const response = generateManuscript(normalized);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}
