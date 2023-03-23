import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { userRouter } from './routers/users.router.js';
import { mainErrorHandler, noRouteHandler } from './middlewares/errorHandler.middleware.js';
import { env } from './config/environment.js';
// import dotenv from 'dotenv';



//create app
const app = express();
// dotenv.config();

//lowdb database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
//set initial db
db.data = db.data || { users: [] }


//core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

//http://localhost:5000/users GET

//routers
app.use('/users', userRouter);


//error handler undefined routes
app.use(noRouteHandler);
//main error handler
app.use(mainErrorHandler);


const dbPassword = env.db_pass;
const email = env.email;
console.log("email:", email, "dbPassword:", dbPassword);

//port
const port = env.port;
app.listen(port, console.log(`server is up on port: ${port}. 👻`));
