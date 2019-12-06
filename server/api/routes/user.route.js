import express from 'express';
import Notes from '../models/notes.model';
import redis from 'redis';
let client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const router = express.Router();

import  isAuth  from '../authentication/isAuth';

router.route('/all').get(isAuth ,async (req,res)=>{
    const data = await  getAsync('notes');
    if(data){
        const notes = JSON.parse(data);
        res.json({
            notes
        })
    }
    else{
        Notes.find()
        .select('_id user notes title isImportant')
        .exec()
        .then(notes=>{
            res.json({notes})
        })
        .catch(err=>{
            console.log(err);
        })
    }
});

router.route('/post').post((req,res)=>{
    let note = new Notes();
    console.log(req.body.note)
    note.user = req.body.username;
    note.notes = req.body.note;
    note.title = req.body.title ;
    note.save()
    .then(()=>{
      return  res.json(
            {
                Posted : true
            }
        )
    })
    .catch(err=>{
        console.log(err);
    })
})

router.route('/user/:id').get(isAuth,async (req,res)=>{
    const data = await getAsync(req.params.id);
    if(data){
        let notes = JSON.parse(data)
        return res.json({notes});
    }
    Notes.find({user:req.params.id})
    .select('_id user notes')
    .exec()
    .then(async (data)=>{
        let notes = await  JSON.stringify(data);
        let success = await setAsync(req.params.id,notes);
        console.log('set data to redis');
        res.json({
            data,
        })
    })
    .catch(err=>{
        console.log(err);
    })
})


export default router;