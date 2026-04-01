import { Timestamp } from 'firebase-admin/firestore';
import type { User } from '../../domain/user.entity';
import type { Task } from '../../domain/task.entity';

export function toDate(value: Timestamp | Date | undefined): Date {
  if (!value) return new Date(0);
  if (value instanceof Date) return value;
  return value.toDate();
}

export function userFromDoc(id: string, data: FirebaseFirestore.DocumentData): User {
  return {
    id,
    email: data.email as string,
    createdAt: toDate(data.createdAt as Timestamp),
  };
}

export function taskFromDoc(id: string, data: FirebaseFirestore.DocumentData): Task {
  return {
    id,
    userId: data.userId as string,
    title: data.title as string,
    description: (data.description as string) ?? '',
    createdAt: toDate(data.createdAt as Timestamp),
    completed: Boolean(data.completed),
  };
}
