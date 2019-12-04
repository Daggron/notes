import cronJob from 'node-cron';
import fetchNotes from './tasks/fetch-notes'

export default async function setRedis(){
    cronJob.schedule('* * * * *',()=>{
        console.log('Running cronJob');
        fetchNotes();
    })
}