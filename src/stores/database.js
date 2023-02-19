import { collection, query, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/firebaseConfig";
import { defineStore } from "pinia";

export const useDatabaseStore = defineStore("database", {
    state: () =>({  
        documents: []

    }),

    actions: {
        async getUrls() {
            try {
                const q = query(collection(db, "urls"), );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    console.log (doc.id, doc.data());
                }); 
            } catch(error){
                console.log(error);
            }
            finally{
            }
        }
    }
});
