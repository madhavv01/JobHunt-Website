
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAk1AolzgFT5yxdU_x1Hk1njXnFMYSSYdA",
  authDomain: "sts-31b59.firebaseapp.com",
  databaseURL: "https://sts-31b59-default-rtdb.firebaseio.com",
  projectId: "sts-31b59",
  storageBucket: "sts-31b59.appspot.com",
  messagingSenderId: "304092000630",
  appId: "1:304092000630:web:814233676b6f1ccdcb0a57",
  measurementId: "G-0286S9NF2Y"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export default app;
export const storage = getStorage(app);