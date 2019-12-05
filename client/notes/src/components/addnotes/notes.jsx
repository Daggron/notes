import React from 'react'
import { Paper } from '@material-ui/core';
import axios from 'axios';

export default function Notes() {
    let [notes , setNotes] = React.useState([]);
    React.useEffect(()=>{
        axios.get('http://localhost:5000/users/user/notes')
        .then(data=>{
            setNotes(data.data.notes);
        })
        .catch(err=>{
            alert(err);
        })
    },[])
    return (
       <React.Fragment>
         {
             notes.map(note=>{
                 return(
                     <Paper key={note._id}>
                         {note.user}
                     </Paper>
                 )
             })
         }
       </React.Fragment>
    )
}
