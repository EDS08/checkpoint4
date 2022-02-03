import { useEffect, useState } from "react";
import Axios from "axios";

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

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      setPostList(
        postList.filter((val) => {
          return (val.id != id);
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((data) => {
      setPostList(data.data);
    });
  }, []);

  return (
    <div className="MainPage">
      <div className="PostContainer">
        {postList.map((val, key) => {
          return (
            <>
              <div className="Post" key={key} onClick={()=>{}}>
                <h1>{val.title}</h1>
                <p>
                  {val.text.length > 500
                    ? val.text.substring(0, 500) + " ..."
                    : val.text}
                </p>
                <h4>{val.username}</h4>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Texte"
                  onChange={(e) => {
                    setNewText(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    uptdateEvent(val.id);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
