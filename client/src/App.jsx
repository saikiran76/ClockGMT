import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OnBoard } from "./pages/Landing";
import Login from "./pages/Login";
import Success from "./pages/Success";
import client from "./utils/supabaseClient";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import store from "./utils/store";
import Tracking from "./pages/Tracking";

const App = () => {
  // const [currentUser, setUser] = useState(null);
  const user = useSelector((state)=>state.user)

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data, error } = await client.auth.getSession();
  //     if (error) {
  //       console.error("Error fetching session:", error.message);
  //       return;
  //     }
  //     setUser(data?.session?.user ?? null);

  //     const { data: authListener } = client.auth.onAuthStateChange(
  //       (event, session) => {
  //         switch (event) {
  //           case "SIGNED_IN":
  //             setUser(session?.user);
  //             break;
  //           case "SIGNED_OUT":
  //             setUser(null);
  //             break;
  //           default:
  //         }
  //       }
  //     );

  //     return () => {
  //       authListener.subscription.unsubscribe();
  //     };
  //   };

  //   fetchSession();
  // }, []);

  const ProtectedRoute = ({ children }) => {
    if (user) {
      return children;
    }

    console.log("The current session user: ", user);
    return <Navigate to="/login" />;
  };

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/tracking" element={<Tracking/>}/>
      </Routes>
    </BrowserRouter>

  );
};

export default App;
