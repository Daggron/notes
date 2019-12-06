import express from 'express';
import userRoutes from './server/api/routes/user.route';
import mongoose from 'mongoose';
import 'dotenv/config';
import setRedis from './server/workers/index';
import cors from 'cors';
import expressSession from 'express-session';
import Passport from 'passport';
import ExpressValidator from 'express-validator';
import authRoutes from './server/api/routes/authenticate.routes';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

let db = mongoose.connection;

db.once('open',()=>{
    console.log('Db working Fine');
});

db.on('error',(err)=>{
    console.log(err);
    console.log('Db not connected');
})

const app = express();

app.use(express.json());

app.use(cors());

app.use(expressSession({
    secret:'A keyboard cat',
    saveUninitialized:true,
    resave:true,
}));

app.use(ExpressValidator());

app.use(Passport.initialize());
app.use(Passport.session());


// setRedis();

app.use('*',(req,res,next)=>{
    req.session.user = req.user || null;
    res.locals.user = req.user || null;
    next();
});

app.use('/notes',userRoutes);
app.use('/authenticate',authRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})