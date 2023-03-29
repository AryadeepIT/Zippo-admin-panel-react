import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgLArwzbcmbfOhyIc3HNbRvLt6k6ZogQ0",
  authDomain: "zippo-foodapp.firebaseapp.com",
  projectId: "zippo-foodapp",
  storageBucket: "zippo-foodapp.appspot.com",
  messagingSenderId: "306049362234",
  appId: "1:306049362234:web:c893e034417f0ca7640803"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };