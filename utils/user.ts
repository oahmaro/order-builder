import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
}

export async function getUserById(id: number) {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getUserByEmailOrUsername(identifier?: string) {
  try {
    return (
      await db.user.findMany({
        where: {
          OR: [{ email: identifier }, { username: identifier }],
        },
      })
    )?.[0];
  } catch {
    return null;
  }
}
