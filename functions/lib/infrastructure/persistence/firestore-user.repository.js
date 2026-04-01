"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firestore_mappers_1 = require("./firestore-mappers");
const COLLECTION = 'users';
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
class FirestoreUserRepository {
    db = (0, firestore_1.getFirestore)();
    async findByEmail(email) {
        const normalized = normalizeEmail(email);
        const snap = await this.db
            .collection(COLLECTION)
            .where('email', '==', normalized)
            .limit(1)
            .get();
        if (snap.empty)
            return null;
        const doc = snap.docs[0];
        return (0, firestore_mappers_1.userFromDoc)(doc.id, doc.data());
    }
    async findById(id) {
        const doc = await this.db.collection(COLLECTION).doc(id).get();
        if (!doc.exists)
            return null;
        return (0, firestore_mappers_1.userFromDoc)(doc.id, doc.data());
    }
    async create(email) {
        const normalized = normalizeEmail(email);
        const ref = this.db.collection(COLLECTION).doc();
        const createdAt = firestore_1.FieldValue.serverTimestamp();
        await ref.set({
            email: normalized,
            createdAt,
        });
        const created = await ref.get();
        return (0, firestore_mappers_1.userFromDoc)(ref.id, created.data());
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
//# sourceMappingURL=firestore-user.repository.js.map