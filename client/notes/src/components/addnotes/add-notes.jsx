import React from 'react'
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import {makeStyles} from '@material-ui/styles';
import  Fab  from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';


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
   const  handleChange = (text,medium)=>{
        console.log(text)
    }

    return (
        <React.Fragment>
            <div className={classes.editor}>
                <Editor  onChange={handleChange} options={{toolbar: {buttons: ['bold', 'italic', 'underline','quote','anchor','h1','h2','h3']}}}>
                </Editor>
                
            </div>
             <Fab className={classes.save} color="secondary" variant="contained">
                 <DoneIcon/>
                    Save
             </Fab>
        </React.Fragment>
    )
    
}
