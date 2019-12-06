import React from 'react'
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import {makeStyles} from '@material-ui/styles';
import  Fab  from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import Axios from 'axios';


const useStyles = makeStyles(theme=>({
    editor:{
        background:"white",
        height:"90vh",
        width:"90vw",
        overflowX:"hidden",
        marginLeft:"5vw",
        marginTop:"7vh",
        fontSize:"20px"
    },
    save:{
        position:"absolute",
        top:"10vh",
        left:"80vw"
    },
    h1:{
        fontSize:"50px"
    }
}))


export default function AddNotes() {
    const classes = useStyles();
    const [notes , setNotes] = React.useState("");
   const  handleChange = (text,medium)=>{
    //    console.log(text)
       let data  = text;
       setNotes(data);
    }

    const handleSave = ()=>{
        console.log('I am running')
        console.log(notes);
        Axios.post('http://localhost:5000/notes/post',{
            title:"New Note",
            username:"Kenny Omega",
            note:notes
        })
        .then((data)=>{
            console.log(data.data);
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <div className={classes.editor}>
                <Editor  onChange={handleChange} options={{toolbar: {buttons: ['bold', 'italic', 'underline','quote','anchor','h1','h2','h3']}}}>
                </Editor>
                
            </div>
             <Fab onClick={handleSave} className={classes.save} color="secondary" variant="extended">
                 <DoneIcon/>
                    Save
             </Fab>
        </React.Fragment>
    )
    
}
