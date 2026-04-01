import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import type {
  CreateTaskInput,
  TaskRepositoryPort,
  UpdateTaskInput,
} from '../../application/ports/task-repository.port';
import type { Task } from '../../domain/task.entity';
import { taskFromDoc } from './firestore-mappers';

const COLLECTION = 'tasks';

export class FirestoreTaskRepository implements TaskRepositoryPort {
  private db = getFirestore();

  async findByUserIdOrdered(userId: string): Promise<Task[]> {
    const snap = await this.db
      .collection(COLLECTION)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => taskFromDoc(d.id, d.data()));
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const ref = this.db.collection(COLLECTION).doc();
    const payload = {
      userId: input.userId,
      title: input.title,
      description: input.description ?? '',
      completed: false,
      createdAt: FieldValue.serverTimestamp(),
    };
    await ref.set(payload);
    const doc = await ref.get();
    return taskFromDoc(ref.id, doc.data()!);
  }

  async update(userId: string, taskId: string, input: UpdateTaskInput): Promise<Task | null> {
    const ref = this.db.collection(COLLECTION).doc(taskId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    if (data.userId !== userId) return null;
    const patch: Record<string, unknown> = {};
    if (input.title !== undefined) patch.title = input.title;
    if (input.description !== undefined) patch.description = input.description;
    if (input.completed !== undefined) patch.completed = input.completed;
    if (Object.keys(patch).length === 0) {
      return taskFromDoc(taskId, data);
    }
    await ref.update(patch);
    const next = await ref.get();
    return taskFromDoc(taskId, next.data()!);
  }

  async delete(userId: string, taskId: string): Promise<boolean> {
    const ref = this.db.collection(COLLECTION).doc(taskId);
    const doc = await ref.get();
    if (!doc.exists) return false;
    if (doc.data()!.userId !== userId) return false;
    await ref.delete();
    return true;
  }
}
