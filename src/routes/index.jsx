import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

export function PrivateRoutes() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Uid: ", uid);
      } else {
        console.log("User is logged out");
      }
    });
  }, []);

  console.log("AUTH: " + auth.currentUser);

  return auth ? <Outlet /> : <Navigate to="/" />;
}
