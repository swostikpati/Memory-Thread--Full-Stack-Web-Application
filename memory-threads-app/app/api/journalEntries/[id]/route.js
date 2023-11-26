import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect.js";
import JournalEntry from "@models/JournalEntryModel.js";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

export async function PUT(request, { params }) {
  const { userId } = auth();
  console.log("params:", params);
  const id = params.id; // Adjust as needed to get the ID
  const { title, content, specialLink, image } = await request.json();

  await dbConnect();
  console.log("id:", id);

  try {
    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      id,
      { title, content, specialLink, image, userId },
      { new: true }
    );
    revalidatePath("/dashboard"); // If necessary
    console.log(updatedEntry);
    return NextResponse.json(updatedEntry, { status: 200 });
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function DELETE(request, { params }) {
  const id = params.id; // Adjust as needed to get the ID
  await dbConnect();
  try {
    const deletedEntry = await JournalEntry.findByIdAndDelete(id);
    revalidatePath("/dashboard"); // If necessary
    console.log(deletedEntry);
    return NextResponse.json(deletedEntry, { status: 200 });
  } catch (error) {
    return NextResponse.error(error);
  }
}
