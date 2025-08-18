import { db } from '../../lib/firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const PLAYERS_COLLECTION = "players";

// Ajouter un joueur
export const addPlayer = async (playerData) => {
  const docRef = await addDoc(collection(db, PLAYERS_COLLECTION), playerData);
  return { id: docRef.id, ...playerData };
}

// Écoute en temps réel
export const onPlayersChange = (callback) => {
  const unsubscribe = onSnapshot(collection(db, PLAYERS_COLLECTION), (snapshot) => {
    const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(players);
  });
  return unsubscribe;
}

// Modifier
export const updatePlayer = async (playerId, updatedData) => {
  await updateDoc(doc(db, PLAYERS_COLLECTION, playerId), updatedData);
}

// Supprimer
export const deletePlayer = async (playerId) => {
  await deleteDoc(doc(db, PLAYERS_COLLECTION, playerId));
}
