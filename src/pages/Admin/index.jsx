import { FaCheckCircle, FaCopy, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Menu } from "../../components/Menu";
import { useToken } from "../../hooks/useToken";

import "./styles.css";

export function Admin() {
  const { generateToken, token, tokens } = useToken();

  async function handleCopy(token) {
    try {
      await navigator.clipboard.writeText(
        location.host + "/avaliacao/" + token.id
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
                      {window.location.host}/avaliacao/{token.id}
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
