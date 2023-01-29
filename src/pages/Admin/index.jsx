import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { uid } from "uid";
import { Menu } from "../../components/Menu";
import { db } from "../../services/firebaseConfig";

import "./styles.css";

export function Admin() {
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
      expiredIn: null,
      used: false,
    })
      .then(() => {
        toast.success("Token gerado com sucesso!", {
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

  async function removeAllTokens() {
    await db
      .collection("tokens")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  }

  return (
    <div className="containerAdmin">
      <h1>Admin</h1>
      <Menu />

      <button className="btnToken" onClick={generateToken}>
        Gerar Token
      </button>

      <button className="btnTokenRemove" onClick={removeAllTokens}>
        Remover todos os Tokens
      </button>

      <h2>Tokens</h2>
      <table id="tokens">
        <thead>
          <tr>
            <th>Código</th>
            <th>Criado em</th>
            <th>Expirado em</th>
            <th>Usado?</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => {
            return (
              <tr key={token.id}>
                <td>{token.id}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(token.createdAt)
                  )}
                </td>
                <td>{token.expiredIn}</td>
                <td>
                  {token.used ? (
                    <FaCheckCircle color="green" />
                  ) : (
                    <FaTimesCircle color="red" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
