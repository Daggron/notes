import express from 'express';
import Notes from '../models/notes.model';
const router = express.Router();

router.route('/notes').get((req,res)=>{
    res.json({
        message:"This is some fake data"
    });
});

router.route('/notes/post').post((req,res)=>{
    let note = new Notes();
    console.log(req.body.note)
    note.user = req.body.username;
    note.notes = req.body.note;
    note.save()
    .then(()=>{
        res.json(
            {note}
        )
    })
    .catch(err=>{
        console.log(err);
    })
})

router.route('/notes/get').get((req,res)=>{
    Notes.find()
    .select('_id user notes')
    .exec()
    .then(notes=>{
        res.json({notes})
    })
    .catch(err=>{
        console.log(err);
    })
})

export default router;