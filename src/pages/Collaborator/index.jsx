import { onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { uid } from "uid";
import { Menu } from "../../components/Menu";
import { db } from "../../services/firebaseConfig";

export function Collaborator() {
  const [collaborator, setCollaborator] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  function handleCollaboratorChange(e) {
    setCollaborator(e.target.value);
  }

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setCollaborators([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((collaborator) => {
          setCollaborators((oldArray) => [...oldArray, collaborator]);
        });
      }
    });
  }, []);

  function addCollaborator() {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      collaborator,
      uuid,
    });

    setCollaborator("");
  }

  function updateCollaborator(collaborator) {
    setIsEdit(true);
    setTempId(collaborator.uuid);
    setCollaborator(collaborator.collaborator);
  }

  function handleUpdateChange() {
    update(ref(db, `/${tempId}`), {
      collaborator,
      uuid: tempId,
    });

    setCollaborator("");
    setIsEdit(false);
  }

  function deleteCollaborator(collaborator) {
    remove(ref(db, `/${collaborator.uuid}`));
  }

  return (
    <>
      <h1>Collaborator</h1>
      <Menu />

      <h4>Add collaborator</h4>
      <input
        type="text"
        value={collaborator}
        onChange={handleCollaboratorChange}
        placeholder="Add Collaborator"
      />
      {isEdit ? (
        <>
          <button onClick={handleUpdateChange}>Update Collaborator</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setCollaborator("");
            }}
          >
            X
          </button>
        </>
      ) : (
        <button onClick={addCollaborator}>Add Collaborator</button>
      )}

      <h3>List collaborators</h3>
      {collaborators.map((collaborator) => {
        return (
          <>
            <h4 key={collaborator.uuid}>{collaborator.collaborator}</h4>
            <button onClick={() => updateCollaborator(collaborator)}>
              Update
            </button>
            <button onClick={() => deleteCollaborator(collaborator)}>
              Delete
            </button>
          </>
        );
      })}
    </>
  );
}
