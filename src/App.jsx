import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./utils/userSlice"; 
import app from "./utils/firebase"; 
import {OnBoard} from './pages/Landing' 
import Login from "./pages/Login"; 
import Success from "./pages/Success"; 
import Tracking from "./pages/Tracking";


const auth = getAuth(app);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
        dispatch(addUser({ uid: user.uid, email: user.email }));
      } else {
        console.log("No user signed in");
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analog-clock/:id" element={<Tracking />} />
        <Route
          path="/"
          element={user ? <Success /> : <Navigate to="/onboard" replace />}
        />
        <Route path="/tracking" element={user ? <Tracking/>: <Navigate to="/login" replace/>}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
