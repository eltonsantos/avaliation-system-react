import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { Star } from "../Star";
import "./styles.css";

export function Form() {
  const [collaborators, setCollaborators] = useState([]);
  const [comment, setComment] = useState("");

  const onOptionChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value);
  };

  const answersCollectionRef = collection(db, "answers");

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

  function handleResult() {
    console.log(currentValue);
    console.log(textareaValue);
  }

  return (
    <div className="container">
      <form id="form-rating" onSubmit={handleResult}>
        <h3>Preencha seus dados</h3>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input type="text" placeholder="Nome" id="name" />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="service">Serviço:</label>
          <input type="text" placeholder="Serviço" id="service" />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="collaborator">Funcionário:</label>
          <select onChange={onOptionChangeHandler}>
            <option>Selecione o funcionário que te atendeu</option>
            {collaborators.map((collaborator, index) => {
              return <option key={index}>{collaborator.name}</option>;
            })}
          </select>
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="stars">
          <h2>A comunicação entre você e o funcionário foi rápida?</h2>
          <Star
            onRatingChanged={(newRating) => {
              console.log(
                `NEW RATING (${newRating}) DETECTED FOR 1.. SAVING TO DB`
              );
            }}
          />
        </div>

        <div className="stars">
          <h2>Foi de fácil entendimento?</h2>
          <Star
            onRatingChanged={(newRating) => {
              console.log(
                `NEW RATING (${newRating}) DETECTED FOR 2.. SAVING TO DB`
              );
            }}
          />
        </div>

        <div className="stars">
          <h2>Gostou do serviço prestado?</h2>
          <Star
            onRatingChanged={(newRating) => {
              console.log(
                `NEW RATING (${newRating}) DETECTED FOR 3.. SAVING TO DB`
              );
            }}
          />
        </div>

        <div className="stars">
          <h2>Recomendaria o serviço para alguém?</h2>
          <Star
            onRatingChanged={(newRating) => {
              console.log(
                `NEW RATING (${newRating}) DETECTED FOR 4.. SAVING TO DB`
              );
            }}
          />
        </div>

        <div className="stars">
          <h2>Comentário, sugestão ou crítica:</h2>

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button className="submit">Submit</button>
      </form>
    </div>
  );
}
