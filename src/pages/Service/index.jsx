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

export function Service() {
  const [name, setName] = useState("");
  const [services, setServices] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  const servicesCollectionRef = collection(db, "services");

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
    await addDoc(servicesCollectionRef, {
      name,
    });
  }

  async function deleteCollaborator(id) {
    const service = doc(db, "services", id);
    await deleteDoc(service);
  }

  async function updateCollaborator(service) {
    setIsEdit(true);
    setTempId(service.id);
    setName(service.name);
  }

  async function handleSubmitChangeCollaborator() {
    const service = doc(db, "services", tempId);
    await updateDoc(service, {
      name,
    });
    setName("");
  }

  return (
    <div className="containerService">
      <h1>Serviços</h1>
      <Menu />

      <div className="inputService">
        <h4>Add service</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add Collaborator"
        />
        {isEdit ? (
          <>
            <button onClick={handleSubmitChangeCollaborator}>
              Update Service
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
        <table id="table-services">
          <thead>
            <tr>
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              return (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>
                    <button
                      className="buttonCollaborator"
                      onClick={() => updateCollaborator(service)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="buttonCollaborator"
                      onClick={() => deleteCollaborator(service.id)}
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
