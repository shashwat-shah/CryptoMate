import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {updateProfile } from "firebase/auth";


export const app = firebase.initializeApp({
  apiKey: "AIzaSyBJNtwcv2h7w2Enp4sTEjvVm9kD8uVkZ6M",
  authDomain: "cryptomate-aec59.firebaseapp.com",
  projectId: "cryptomate-aec59",
  storageBucket: "cryptomate-aec59.appspot.com",
  messagingSenderId: "240144386983",
  appId: "1:240144386983:web:350d72119b93b447b80482",
  measurementId: "G-V29RR2P4F3"
});

const storage = getStorage();

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}

export const db = getFirestore(app);