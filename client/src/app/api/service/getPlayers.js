import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // المسار ديال db ديالك

export const getPlayers = async () => {
  try {
    const playersCollection = collection(db, "players"); // اسم collection
    const snapshot = await getDocs(playersCollection);    // جلب البيانات
    const playersData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return playersData;
  } catch (error) {
    console.error("Erreur getPlayers:", error);
    return [];
  }
};
