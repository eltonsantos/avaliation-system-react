import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../hooks/useToken";

import { db } from "../services/firebaseConfig";

export function TokenRoutes({ id }) {
  let query = useToken();

  const [token, setToken] = useState("");

  const tokensCollectionRef = collection(db, "tokens");

  useEffect(() => {
    const getTokens = async () => {
      const data = await getDocs(tokensCollectionRef);
      setToken(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getTokens();
    console.log("TOKEN: " + id);
  }, []);

  return token != "undefined" ? <Outlet /> : <Navigate to="/notfound" />;
}
