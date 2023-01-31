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
    const getServices = async () => {
      const data = await getDocs(servicesCollectionRef);
      setServices(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getServices();
  }, []);

  async function createServices() {
    await addDoc(servicesCollectionRef, {
      name,
    });
  }

  async function deleteService(id) {
    const service = doc(db, "services", id);
    await deleteDoc(service);
  }

  async function updateService(service) {
    setIsEdit(true);
    setTempId(service.id);
    setName(service.name);
  }

  async function handleSubmitChangeService() {
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
          placeholder="Add Service"
        />
        {isEdit ? (
          <>
            <button onClick={handleSubmitChangeService}>Update Service</button>
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
          <button onClick={createServices}>Add Service</button>
        )}
      </div>

      <div className="list-services">
        <h3>List services</h3>
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
                      className="buttonService"
                      onClick={() => updateService(service)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="buttonService"
                      onClick={() => deleteService(service.id)}
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
