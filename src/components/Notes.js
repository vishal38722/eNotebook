import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';


const Notes = () => {
    // we can use this commented syntax also to use noteContext
    // const context = useContext(noteContext)
    // const {notes, setNotes} = context;
    const { notes, getNotes } = useContext(noteContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login')
        }
    })
    return (
        <>
            <AddNote />
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
