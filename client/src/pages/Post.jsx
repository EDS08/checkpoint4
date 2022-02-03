import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  let { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getFromId/${postId}`).then((data) => {
      setPost({
        title: data.data[0].title,
        postText: data.data[0].text,
        username: data.data[0].username,
      });
      console.log(data.data[0].title)
    });
  }, []);
  return (
    <div className="Post">
      <h1>{post.title}</h1>
      <p>
        {post.postText}
      </p>
      <h4>{post.username}</h4>
    </div>
  );
};

export default Post;
