"use server";

import { createNote, deleteNote, getNoteById, getNotesByFolderId, getNotesByUserId, updateNote } from "@/db/queries/notes-queries";
import { InsertNote } from "@/db/schema/notes-schema";
import { ActionResult } from "@/types/action-types";
import { revalidatePath } from "next/cache";

export const createNoteAction = async (data: InsertNote): Promise<ActionResult<void>> => {
  try {
    await createNote(data);
    revalidatePath("/notes");
    return { isSuccess: true, message: "Note created successfully" };
  } catch (error) {
    console.error("Error in createNoteAction:", error);
    return { isSuccess: false, message: "Failed to create note" };
  }
};

export const getNoteByIdAction = async (id: string): Promise<ActionResult<any>> => {
  try {
    const note = await getNoteById(id);
    return { isSuccess: true, message: "Note retrieved successfully", data: note };
  } catch (error) {
    console.error("Error in getNoteByIdAction:", error);
    return { isSuccess: false, message: "Failed to get note" };
  }
};

export const getNotesByUserIdAction = async (userId: string): Promise<ActionResult<any[]>> => {
  try {
    const notes = await getNotesByUserId(userId);
    return { isSuccess: true, message: "Notes retrieved successfully", data: notes };
  } catch (error) {
    console.error("Error in getNotesByUserIdAction:", error);
    return { isSuccess: false, message: "Failed to get notes" };
  }
};

export const getNotesByFolderIdAction = async (folderId: string, userId: string): Promise<ActionResult<any[]>> => {
  try {
    const notes = await getNotesByFolderId(folderId, userId);
    return { isSuccess: true, message: "Notes retrieved successfully", data: notes };
  } catch (error) {
    console.error("Error in getNotesByFolderIdAction:", error);
    return { isSuccess: false, message: "Failed to get notes" };
  }
};

export const updateNoteAction = async (id: string, data: Partial<InsertNote>): Promise<ActionResult<void>> => {
  try {
    await updateNote(id, data);
    revalidatePath("/notes");
    return { isSuccess: true, message: "Note updated successfully" };
  } catch (error) {
    console.error("Error in updateNoteAction:", error);
    return { isSuccess: false, message: "Failed to update note" };
  }
};

export const deleteNoteAction = async (id: string): Promise<ActionResult<void>> => {
  try {
    await deleteNote(id);
    revalidatePath("/notes");
    return { isSuccess: true, message: "Note deleted successfully" };
  } catch (error) {
    console.error("Error in deleteNoteAction:", error);
    return { isSuccess: false, message: "Failed to delete note" };
  }
}; 