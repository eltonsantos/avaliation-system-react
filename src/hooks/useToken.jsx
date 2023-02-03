import { addDoc, collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uid } from "uid";
import { db } from "../services/firebaseConfig";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState();

  const tokensCollectionRef = collection(db, "tokens");

  useEffect(() => {
    const getTokens = async () => {
      const data = await getDocs(tokensCollectionRef);
      setTokens(
        data.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };

    getTokens();
  }, []);

  async function generateToken() {
    await addDoc(tokensCollectionRef, {
      id: uid(),
      createdAt: new Date().toString(),
      expiredIn: new Date(
        new Date().setDate(new Date().getDate() + 7)
      ).toString(),
      used: false,
    })
      .then(() => {
        toast.success("Avaliação gerada com sucesso!", {
          theme: "colored",
        });
        console.log("Gerado no firebase 🔥");
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao gerar", {
          theme: "colored",
        });
        console.log(error.message);
      });
  }

  return (
    <TokenContext.Provider value={{ generateToken, token, tokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  return context;
}
