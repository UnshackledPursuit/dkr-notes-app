"use server";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { InsertFolder, SelectFolder, foldersTable } from "../schema/folders-schema";

export const createFolder = async (data: InsertFolder) => {
  try {
    const [newFolder] = await db.insert(foldersTable).values(data).returning();
    return newFolder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder");
  }
};

export const getFolderById = async (id: string) => {
  try {
    const folder = await db.query.foldersTable.findFirst({
      where: eq(foldersTable.id, id)
    });
    if (!folder) {
      throw new Error("Folder not found");
    }
    return folder;
  } catch (error) {
    console.error("Error getting folder by ID:", error);
    throw new Error("Failed to get folder");
  }
};

export const getFoldersByUserId = async (userId: string): Promise<SelectFolder[]> => {
  try {
    return db.query.foldersTable.findMany({
      where: eq(foldersTable.userId, userId)
    });
  } catch (error) {
    console.error("Error getting folders by user ID:", error);
    throw new Error("Failed to get folders");
  }
};

export const updateFolder = async (id: string, data: Partial<InsertFolder>) => {
  try {
    const [updatedFolder] = await db.update(foldersTable)
      .set(data)
      .where(eq(foldersTable.id, id))
      .returning();
    return updatedFolder;
  } catch (error) {
    console.error("Error updating folder:", error);
    throw new Error("Failed to update folder");
  }
};

export const deleteFolder = async (id: string) => {
  try {
    await db.delete(foldersTable).where(eq(foldersTable.id, id));
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw new Error("Failed to delete folder");
  }
}; 