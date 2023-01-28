import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConfig";
import { Star } from "../Star";
import "./styles.css";

export function Form() {
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState([]);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [answer4, setAnswer4] = useState(0);
  const [comment, setComment] = useState("");

  // const onOptionChangeHandler = (event) => {
  //   console.log("Collaborator Selected Value - ", event.target.value);
  // };

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

  async function handleSubmitResult(e) {
    console.log("ENTRA");
    e.preventDefault();
    await addDoc(answersCollectionRef, {
      name,
      service,
      collaborator,
      answer1,
      answer2,
      answer3,
      answer4,
      comment,
    })
      .then(() => {
        console.log("SALVO!");

        setName("");
        setService("");
        setCollaborator("");
        setAnswer1(0);
        setAnswer2(0);
        setAnswer3(0);
        setAnswer4(0);
        setComment("");

        navigate("/thanks");
      })
      .catch((err) => {
        console.log("ERRO: " + err);
      });
  }

  return (
    <div className="container">
      <form id="form-rating" onSubmit={handleSubmitResult}>
        <h3>Preencha seus dados</h3>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="service">Serviço:</label>
          <input
            type="text"
            placeholder="Serviço"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="collaborator">Funcionário:</label>
          <select onChange={(e) => setCollaborator(e.target.value)}>
            <option value="">Selecione o funcionário que te atendeu</option>
            {collaborators.map((collaborator, index) => (
              <option value={collaborator.name} key={index}>
                {collaborator.name}
              </option>
            ))}
          </select>
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="stars">
          <h2>A comunicação entre você e o funcionário foi rápida?</h2>
          <Star
            value={answer1}
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
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
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
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
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
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
            onRatingChanged={(newRating) => {
              console.log(
                `NEW RATING (${newRating}) DETECTED FOR 4.. SAVING TO DB`
              );
            }}
          />
        </div>

        <div className="comment">
          <h2>Comentário, sugestão ou crítica:</h2>
          <textarea
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
