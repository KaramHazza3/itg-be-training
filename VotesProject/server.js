import express from 'express'
import path from 'path'
import sequelize from './src/persistance/db-context.js';
import User from './src/persistance/models/user-model.js'
import Option from './src/persistance/models/option-model.js'
import Poll from './src/persistance/models/poll-model.js'
import Vote from './src/persistance/models/vote-model.js';
import { __dirname } from './pathUtils.js';
import expressLayouts  from 'express-ejs-layouts';
import authRoutes from './src/routes/auth-routes.js';
import pollRoutes from './src/routes/poll-routes.js';
import authenticateToken from './src/middlewares/auth-middleware.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = new Server(server , {
  connectionStateRecovery: {}
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(cors());
app.set('layout', 'layout');

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to SQLite has been established successfully.');

      await sequelize.sync({ force: false });
      console.log('Database synchronized successfully.');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  app.use(authRoutes);
  app.use((req, res, next) => {
    if (req.originalUrl === '/login' || req.originalUrl === '/signup') {
      return next();
    }
    authenticateToken(req, res, next);
  });
  app.use(pollRoutes);


  io.on('connection', (socket) => {
    console.log("A user is connected");
  });

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

export { io };