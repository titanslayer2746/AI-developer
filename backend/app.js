import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/users', userRoutes);

app.get('/',function(req,res){
    res.send('Hello World');
});

export default app;