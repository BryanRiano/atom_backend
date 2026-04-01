import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import type { UserRepositoryPort } from '../../application/ports/user-repository.port';
import type { User } from '../../domain/user.entity';
import { userFromDoc } from './firestore-mappers';

const COLLECTION = 'users';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export class FirestoreUserRepository implements UserRepositoryPort {
  private db = getFirestore();

  async findByEmail(email: string): Promise<User | null> {
    const normalized = normalizeEmail(email);
    const snap = await this.db
      .collection(COLLECTION)
      .where('email', '==', normalized)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return userFromDoc(doc.id, doc.data());
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return userFromDoc(doc.id, doc.data()!);
  }

  async create(email: string): Promise<User> {
    const normalized = normalizeEmail(email);
    const ref = this.db.collection(COLLECTION).doc();
    const createdAt = FieldValue.serverTimestamp();
    await ref.set({
      email: normalized,
      createdAt,
    });
    const created = await ref.get();
    return userFromDoc(ref.id, created.data()!);
  }
}
