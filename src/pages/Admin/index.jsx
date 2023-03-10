import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaCopy, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { uid } from "uid";
import { Menu } from "../../components/Menu";
import { db } from "../../services/firebaseConfig";

import "./styles.css";

export function Admin() {
  const [tokens, setTokens] = useState([]);

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

  async function handleCopy(token) {
    try {
      await navigator.clipboard.writeText(
        "http://" + location.host + "/avaliacao/" + token.id
      );
      toast.success("Copiado!", {
        theme: "colored",
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao copiar", {
        theme: "colored",
      });
      console.log(error.message);
    }
  }

  return (
    <div className="containerAdmin">
      <h1>Admin</h1>
      <Menu />

      <button className="btnToken" onClick={generateToken}>
        Gerar Avaliação
      </button>

      <div className="list-tokens">
        <h3>Avaliações</h3>
        <table id="table-tokens">
          <thead>
            <tr>
              <th>URL</th>
              <th>Criado em</th>
              <th>Expirado em</th>
              <th>Usado?</th>
            </tr>
          </thead>
          <tbody>
            {tokens
              .sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
              })
              .reverse()
              .map((token) => {
                return (
                  <tr rowSpan="2" key={token.id}>
                    <td>
                      <FaCopy
                        color="gray"
                        cursor="pointer"
                        onClick={() => handleCopy(token)}
                        id="iconCopy"
                      />
                      https://{window.location.host}/avaliacao/{token.id}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(token.createdAt)
                      )}
                    </td>
                    <td>
                      {new Date(token.expiredIn).getTime() >
                      new Date().getTime()
                        ? ""
                        : new Intl.DateTimeFormat("pt-BR").format(
                            new Date(token.expiredIn)
                          )}
                    </td>
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
    </div>
  );
}
