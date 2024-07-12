import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEKEY,
  authDomain: "bugger-eb598.firebaseapp.com",
  projectId: "bugger-eb598",
  storageBucket: "bugger-eb598.appspot.com",
  messagingSenderId: "821663695047",
  appId: "1:821663695047:web:6027fcf1c78bacab6c3ee2"
};

const app = initializeApp(firebaseConfig);

export default app;