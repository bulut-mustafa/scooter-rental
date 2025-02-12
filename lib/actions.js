'use server';
import { collection, getDocs,getDoc, query, where,doc } from "firebase/firestore";
import { db } from "@/firebase";

export async function getDataFromFirestore(collectionName, filters = []) {
    try {
        const colRef = collection(db, collectionName);

        // Apply filters if provided
        const q = filters.length > 0
            ? query(
                colRef,
                ...filters.map((filter) => where(filter.field, filter.operator, filter.value))
            )
            : colRef;

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return data;
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        return [];
    }
}

export async function getPriceList(bikeId) {
    try {
        if (!bikeId) {
            throw new Error("Invalid bikeId");
        }

        // Ensure bikeId is a string
        const priceListRef = collection(db, `bike-model/${bikeId}/price-list`);

        // Fetch the documents in the subcollection
        const snapshot = await getDocs(priceListRef);

        // Format the data
        const priceList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return priceList;
    } catch (error) {
        console.error("Error fetching price list:", error);
        return [];
    }
}

export async function getBikeById(bikeId) {
    try {
        if (!bikeId) {
            throw new Error("Invalid bikeId");
        }

        // Log the bikeId and collection path
        console.log("Getting bike by ID:", bikeId);

        const docRef = doc(db, "bike-model", bikeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}
