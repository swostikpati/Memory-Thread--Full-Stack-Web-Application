// app/api/journalEntries.route.js
import {NextResponse} from 'next/server';
import dbConnect from '@lib/dbConnect.js';
import JournalEntry from '@models/JournalEntryModel.js';

export async function POST(request) {
  const { title, content, specialLink, image } = await request.json();
  await dbConnect();
  await JournalEntry.create({ title, content, specialLink, image });
  return NextResponse.json({ message: 'Journal entry created' }, {statius: 201});
}
