"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepository = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firestore_mappers_1 = require("./firestore-mappers");
const COLLECTION = 'tasks';
class FirestoreTaskRepository {
    db = (0, firestore_1.getFirestore)();
    async findByUserIdOrdered(userId) {
        const snap = await this.db
            .collection(COLLECTION)
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        return snap.docs.map((d) => (0, firestore_mappers_1.taskFromDoc)(d.id, d.data()));
    }
    async create(input) {
        const ref = this.db.collection(COLLECTION).doc();
        const payload = {
            userId: input.userId,
            title: input.title,
            description: input.description ?? '',
            completed: false,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
        };
        await ref.set(payload);
        const doc = await ref.get();
        return (0, firestore_mappers_1.taskFromDoc)(ref.id, doc.data());
    }
    async update(userId, taskId, input) {
        const ref = this.db.collection(COLLECTION).doc(taskId);
        const doc = await ref.get();
        if (!doc.exists)
            return null;
        const data = doc.data();
        if (data.userId !== userId)
            return null;
        const patch = {};
        if (input.title !== undefined)
            patch.title = input.title;
        if (input.description !== undefined)
            patch.description = input.description;
        if (input.completed !== undefined)
            patch.completed = input.completed;
        if (Object.keys(patch).length === 0) {
            return (0, firestore_mappers_1.taskFromDoc)(taskId, data);
        }
        await ref.update(patch);
        const next = await ref.get();
        return (0, firestore_mappers_1.taskFromDoc)(taskId, next.data());
    }
    async delete(userId, taskId) {
        const ref = this.db.collection(COLLECTION).doc(taskId);
        const doc = await ref.get();
        if (!doc.exists)
            return false;
        if (doc.data().userId !== userId)
            return false;
        await ref.delete();
        return true;
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
//# sourceMappingURL=firestore-task.repository.js.map