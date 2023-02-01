import firebaseapp from "./Firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.firestore(firebaseapp)

export async function isUserAdmin(uid) {
    const response = await db.collection("admins").doc(uid).get();
    return response.exist;
}