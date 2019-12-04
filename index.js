import express from 'express';
import userRoutes from './server/api/routes/user.route';
import mongoose from 'mongoose';
import 'dotenv/config';

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

app.get('/',(req,res)=>{
    res.status(200).json({
        'message':"Hello I am working Fine"
    })
})

app.use('/users',userRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})