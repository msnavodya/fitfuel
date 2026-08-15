import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export async function createOrder(userId, items, total) {
  const docRef = await addDoc(collection(db, 'orders'), {
    userId: userId || null,
    items,
    total,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export default { createOrder };
