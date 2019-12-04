import Notes from '../../api/models/notes.model';
import Redis from 'redis';
let client = Redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

export default async function fetchNotes(){
    console.log('running func')
    let data = await Notes.find({}).select('_id user notes');
    let notes = await JSON.stringify(data);
    let success = await setAsync('notes',notes);
    console.log({success});
}

