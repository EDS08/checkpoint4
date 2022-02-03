import { useState } from "react";
import Axios from "axios";
import "../App.css";

const CreatePost = () => {
  const [username, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submitPost = () => {
    Axios.post("http://localhost:3001/api/create", {
      username: username,
      title: title,
      text: text,
    });
  };

  return (
    <form action="">
      <div className="CreatePost">
        <div className="uploadPost">
          <label>Ton pseudo</label>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <label>Titre avec niveau</label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label>Lieu / Coordonnées / déroulement</label>
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <button className="submitPost" onClick={submitPost} type="submit">Validation</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
