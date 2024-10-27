
const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const Board = require('./models/Board'); 
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const boardRoutes = require("./routes/boardRoutes");
const cors = require("cors");

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend URL
    methods:  ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);


app.options("*", cors());

app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/board", boardRoutes);

app.post('/api/board/add-people', async (req, res) => {
  const { email } = req.body;

  console.log(email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const board = new Board({
      people: [{ email }]
    });
    
    
    console.log(board);

   
    await board.save();

    res.status(200).json({ message: 'Person added successfully' });
  } catch (error) {
    console.error('Error adding person:', error);
    res.status(500).json({ message: 'Error adding person. Please try again later.' });
  }
});


app.listen(port, () => console.log(`Node server listening on port ${port}!`));