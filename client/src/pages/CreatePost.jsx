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
    <div className="CreatePost">
      <div className="uploadPost">
        <label>UserName</label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <label>Title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>Post Text</label>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <button onClick={submitPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
