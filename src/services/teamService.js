import { db } from "../src/services/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const getUserTeamRef = (userId) =>
    collection(db, "times", userId, "membros");

// CREATE
export const addHeroToTeam = async (userId, hero) => {
    await addDoc(getUserTeamRef(userId), hero);
};

// READ
export const getTeam = async (userId) => {
    const snapshot = await getDocs(getUserTeamRef(userId));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// UPDATE
export const updateHero = async (userId, heroId, data) => {
    const heroRef = doc(db, "times", userId, "membros", heroId);
    await updateDoc(heroRef, data);
};

// DELETE
export const removeHero = async (userId, heroId) => {
    const heroRef = doc(db, "times", userId, "membros", heroId);
    await deleteDoc(heroRef);
};
