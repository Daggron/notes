import React from 'react'
import { Paper } from '@material-ui/core';
import axios from 'axios';

export default function Notes() {
    let [notes , setNotes] = React.useState([]);
    let [user , setUser] = React.useState(false);
    React.useEffect(()=>{
        axios.get('http://localhost:5000/notes/all')
        .then(data=>{
            console.log(data.data)
            if(data.data.user===false){
                setUser(user);
            }
            else{
                setNotes(data.data.notes);
            }
        })
        .catch(err=>{
            alert(err);
        })
    })

    if(user === false){
        return (
            <React.Fragment>
                You must be logged in to view this page
            </React.Fragment>
        )
    }
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
