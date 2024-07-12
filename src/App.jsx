import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { OnBoard } from "./pages/Landing";
import Login from "./pages/Login";
import Success from "./pages/Success";
import client from "./utils/supabaseClient";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import Tracking from "./pages/Tracking";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await client.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      if (data?.session?.user) {
        dispatch(addUser(data.session.user));
      } else {
        dispatch(removeUser());
      }

      const { data: authListener } = client.auth.onAuthStateChange(
        (event, session) => {
          switch (event) {
            case "SIGNED_IN":
              dispatch(addUser(session?.user));
              break;
            case "SIGNED_OUT":
              dispatch(removeUser());
              break;
            default:
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchSession();
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    if (user) {
      return children;
    }
    return <Navigate to="/onboard" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/tracking" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
