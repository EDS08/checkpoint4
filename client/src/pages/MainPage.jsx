import { useEffect, useState } from "react";
import Axios from "axios";
import fond from "../img/fond.jpg"

const MainPage = () => {
  const [postList, setPostList] = useState([]);
  const [newText, setNewText] = useState(0);
  const [newTitle, setNewTitle] = useState(0);

  const uptdateEvent = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      title: newTitle,
      text: newText,
    }).then((response) => {
      setPostList(
        postList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                title: newTitle,
                text: newText,
                username: val.username,
              }
            : val;
        })
      );
    });
  };

  const deletePost = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      setPostList(
        postList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/posts").then((data) => {
      setPostList(data.data);
    });
  }, []);

  return (
    <div className="MainPage">
      <img className="fond_main" src={fond} alt="" />
      <div className="PostContainer">
        {postList.map((val, key) => {
          return (
            <div className="Post_main">
              <div className="Post" key={key} onClick={() => {}}>
                <h1>{val.title}</h1>
                <p>
                  {val.text.length > 500
                    ? val.text.substring(0, 500) + " ..."
                    : val.text}
                </p>
                <h4>{val.username}</h4>
              </div>
              <div className="update_post">
                <input
                  className="main_title"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
                <input
                  className="main_text"
                  type="text"
                  placeholder="Texte"
                  onChange={(e) => {
                    setNewText(e.target.value);
                  }}
                />
                <div className="button_main">
                  <button
                    className="updateButton_post"
                    onClick={() => {
                      uptdateEvent(val.id);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="delete_post"
                    onClick={() => {
                      deletePost(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
