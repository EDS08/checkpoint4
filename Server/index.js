const connection = require("./db-config");
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

//GET POST
app.get("/api/get", (req, res) => {
  connection.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM posts WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

//CREATE POST
app.post("/api/create", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const text = req.body.text;

  connection.query(
    "INSERT INTO posts (title, text, username) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//UPDATE POST

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const title = req.body.title;
  connection.query(
    "UPDATE posts SET text=?, title=? WHERE id=?",
    [text, title, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//DELETE POST
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM posts WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
