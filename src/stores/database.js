import { collection, query, getDocs, getDoc, where, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore/lite";
import { db, auth } from "@/firebase/firebaseConfig";
import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import  router from "../router/index";

export const useDatabaseStore = defineStore("database", {
    state: () =>({  
        documents: [],
        loadingDoc: false,
    }),

    actions: {
        async getUrls() {

            if (this.documents.length !== 0)
            {
                return;
            }

            this.loadingDoc = true;
            try {
                const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                }); 
            } catch(error){
            }
            finally{
                this.loadingDoc = false;
            }
        },
        async addUrls(name) {
            try{
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            }catch(error){
            }
        },
        async readUrl(id){
            try{
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()){
                    throw new Error("No existe este documento");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("Error de acceso al documento");
                }
                return docSnap.data().name
            } catch(error){
            }
        },
        async updateUrl(id, name){
            try{
                const docRef = doc(db, "urls", id);

                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()){
                    throw new Error("No existe este documento");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("Error de acceso al documento");
                }
                await updateDoc(docRef, {
                    name: name
                })
                
                this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item);
                router.push("/");
            }catch(error){
            }
        },
        async deleteUrl(id){
            try{
                const docRef = doc(db, "urls", id);

                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()){
                    throw new Error("No existe este documento");
                }
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("Error de acceso al documento");
                }
                await deleteDoc(docRef);
                this.documents = this.documents.filter(item => item.id !== id)
            } catch(error){
            }
        }
    }
});
