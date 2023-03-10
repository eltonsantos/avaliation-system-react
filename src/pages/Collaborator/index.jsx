import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { db } from "../../services/firebaseConfig";

import "./styles.css";

export function Collaborator() {
  const [name, setName] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  const collaboratorsCollectionRef = collection(db, "collaborators");

  useEffect(() => {
    const getCollaborators = async () => {
      const data = await getDocs(collaboratorsCollectionRef);
      setCollaborators(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getCollaborators();
  }, []);

  async function createCollaborators() {
    await addDoc(collaboratorsCollectionRef, {
      name,
    });
  }

  async function deleteCollaborator(id) {
    const collaborator = doc(db, "collaborators", id);
    await deleteDoc(collaborator);
  }

  async function updateCollaborator(collaborator) {
    setIsEdit(true);
    setTempId(collaborator.id);
    setName(collaborator.name);
  }

  async function handleSubmitChangeCollaborator() {
    const collaborator = doc(db, "collaborators", tempId);
    await updateDoc(collaborator, {
      name,
    });
    setName("");
  }

  return (
    <div className="containerCollaborator">
      <h1>Collaborator</h1>
      <Menu />

      <div className="inputCollaborator">
        <h4>Add collaborator</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add Collaborator"
        />
        {isEdit ? (
          <>
            <button onClick={handleSubmitChangeCollaborator}>
              Update Collaborator
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setName("");
              }}
            >
              X
            </button>
          </>
        ) : (
          <button onClick={createCollaborators}>Add Collaborator</button>
        )}
      </div>

      <div className="list-collaborators">
        <h3>List collaborators</h3>
        <table id="table-collaborators">
          <thead>
            <tr>
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {collaborators
              .sort(function (a, b) {
                return new Date(a.name) - new Date(b.name);
              })
              .reverse()
              .map((collaborator) => {
                return (
                  <tr key={collaborator.id}>
                    <td>{collaborator.name}</td>
                    <td>
                      <button
                        className="buttonCollaborator"
                        onClick={() => updateCollaborator(collaborator)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="buttonCollaborator"
                        onClick={() => deleteCollaborator(collaborator.id)}
                      >
                        Delete
                      </button>
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
