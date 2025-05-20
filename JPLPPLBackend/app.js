// app.js (or server.js)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http'); // Import http to create server
const { Server } = require('socket.io');
const axios = require('axios')

const connect = require('./db/conn'); // MongoDB connection
const Registration = require('./models/Registration');
const ProblemStatement = require('./models/Addqueform.js');
const QuizData = require('./models/Addquizform.js');
const ACTIONS = require('./Actions');


const RegistrationRoute = require('./Router/registrationRoutes.js')

const app = express();

// Enable CORS for frontend requests
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000"
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// User map to keep track of connected clients (socketId -> username)
const userSocketMap = {};

// Helper to get all clients connected to a room
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log('Socket connected:', socket.id);

  // User joins a room
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Notify all clients in the room about the new user
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Code change syncing
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Sync code to a specific socket (new user)
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle disconnection
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const languageConfig = {
  python3: { versionIndex: "3" },
  java: { versionIndex: "3" },
  cpp: { versionIndex: "4" },
  nodejs: { versionIndex: "3" },
  c: { versionIndex: "4" },
  ruby: { versionIndex: "3" },
  go: { versionIndex: "3" },
  scala: { versionIndex: "3" },
  bash: { versionIndex: "3" },
  sql: { versionIndex: "3" },
  pascal: { versionIndex: "2" },
  csharp: { versionIndex: "3" },
  php: { versionIndex: "3" },
  swift: { versionIndex: "3" },
  rust: { versionIndex: "3" },
  r: { versionIndex: "3" },
};



app.use('/api/registration' , RegistrationRoute)

app.post("/compile", async (req, res) => {
  const { code, language } = req.body;

  try {
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      script: code,
      language: language,
      versionIndex: languageConfig[language].versionIndex,
      clientId: process.env.jDoodle_clientId,
      clientSecret: process.env.kDoodle_clientSecret,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to compile code" });
  }
});

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// ========== Routes ==========

// Registration form POST route
app.post('/register', upload.single('screenshot'), async (req, res) => {
  const { name, email, enrollment, college, branch, year, section, league, transaction } = req.body;
  const screenshot = req.file;

  if (!screenshot) {
    return res.status(400).json({  error: 'Screenshot is required' });
  }

  try {
    const newRegistration = new Registration({
      name,
      email,
      enrollment,
      college,
      branch,
      year,
      section,
      league,
      transaction,
      screenshot: screenshot.path,
    });

    await newRegistration.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Add new problem statement POST route
app.post('/add-question', async (req, res) => {
  const { league, question, description, testCases } = req.body;

  try {
    const newProblem = new ProblemStatement({
      league,
      title: question,
      description,
      testCases,
    });

    await newProblem.save();
    res.status(201).json({ message: 'Problem added successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add problem' });
  }
});

// Fetch all problem statements GET route
app.get('/allquestions', async (req, res) => {
  try {
    const problems = await ProblemStatement.find({}, 'title description');
    res.status(200).json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Delete problem statement DELETE route
app.delete("/delete-question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await ProblemStatement.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.status(200).json({ message: "Problem removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete problem" });
  }
});

// Contest login POST route
app.post('/contestlogin', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({ email, enrollment });

    if (user) {
      res.status(200).json({ message: 'Welcome to contest page', user });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Contest homepage GET route (all problems)
app.get('/contesthomepage', async (req, res) => {
  try {
    const problems = await ProblemStatement.find();
    res.status(200).json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// Admin login POST route
app.post('/adminlogin', async (req, res) => {
  const { email, enrollment } = req.body;

  try {
    const user = await Registration.findOne({ email, enrollment });

    if (user) {
      res.status(200).json({ message: 'Welcome to contest page', userId: user._id });
    } else {
      res.status(400).json({ error: 'Invalid email or enrollment number' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Add quiz POST route
app.post('/addquiz', async (req, res) => {
  try {
    const quizData = req.body;

    const newQuiz = new QuizData({
      selectedLeague: quizData.selectedLeague,
      questions: quizData.questions,
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: 'Quiz added successfully!',
      data: newQuiz,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the quiz.',
      error: error.message,
    });
  }
});

// Get quiz by league GET route
app.get('/getquiz/:league', async (req, res) => {
  const league = req.params.league;

  try {
    const quizData = await QuizData.find({ selectedLeague: league });

    if (quizData.length > 0) {
      res.json({ success: true, quiz: quizData[0].questions });
    } else {
      res.status(404).json({ success: false, message: 'Quiz data not found for this league.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching quiz data', error });
  }
});

// Get all quizzes GET route
app.get('/allquizzes', async (req, res) => {
  try {
    const quizzes = await QuizData.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete quiz DELETE route
app.delete('/delete-quiz/:id', async (req, res) => {
  const { id } = req.params;
  const { league } = req.body;

  try {
    const quiz = await QuizData.findOneAndDelete({ _id: id, selectedLeague: league });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found or league mismatch' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Start server ==========
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
