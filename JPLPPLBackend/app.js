// app.js (or server.js)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http'); 
const { Server } = require('socket.io');
const axios = require('axios')

const connect = require('./db/conn'); // MongoDB connection
const Registration = require('./models/Registration');
const ProblemStatement = require('./models/problemstatement.js');
const QuizData = require('./models/Quiz.js');
const ACTIONS = require('./Actions');

// Importin Routers
const RegistrationRoute = require('./Router/registrationRoutes.js')
const AdminRoutes = require('./Router/AdminRoutes.js')
const AuthRouter = require('./Router/authRoutes')
const Quizrouter = require('./Router/QuizRouter.js')
const ContactUs = require('./Router/ContactUsRoute.js')

const app = express();

// Enable CORS for frontend requests
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://172.16.3.44:5173",
  "https://coding-ka-cricket.vercel.app",
  "https://coding-ka-cricket-81k2r8vbr-nishant-jhades-projects.vercel.app"
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin: [
  "http://localhost:5173",
  "https://coding-ka-cricket.vercel.app/",
  "https://coding-ka-cricket-81k2r8vbr-nishant-jhades-projects.vercel.app/"
],
    methods: ["GET", "POST"],
  },
});


// Server Routes
app.use('/api/registration' , RegistrationRoute)
app.use('/api/admin' , AdminRoutes)
app.use('/api/auth' , AuthRouter)
app.use('/api/quiz' , Quizrouter);
app.use('/api/contact', ContactUs)




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

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.sendFile(filePath);
  });
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


// ========== Start server ==========
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
