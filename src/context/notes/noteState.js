import NoteContext from "./noteContext";
import React, { useState } from "react";
import { fetchNotes } from "../../utils/APIRoutes";
import { addNotes } from "../../utils/APIRoutes";
import { deleteNotes } from "../../utils/APIRoutes";
import { editNotes } from "../../utils/APIRoutes";

const NoteState = (props) => {
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)

  // Add a note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${fetchNotes}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      }
    });
    // this function returns promise so add "await" before it
    const json = await response.json(); 
    // console.log(json);
    setNotes(json)
  }


  // Add a note
  const addNote = async (title, description, tag) => {

    // API Call
    const response = await fetch(`${addNotes}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) 
    });
    const json = response.json(); 

    const note = {
      "_id": "633eg61d233c2a39405ce9c0",
      "user": "633c7c0461a672cc0194e9b6",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-10-06T06:30:53.827Z",
      "__v": 0
    }
    if(title==="" | description===""){
      console.log("Title or Description can not be blank")
      return;
    }
    setNotes(notes.concat(note));
    console.log("A new Note added");
  }

  // delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${deleteNotes}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      }
    });
    const json = response.json(); 

    // this filter function will return the notes whose id is not equal to the id passed as parameter
    // in the deleteNote function i.e. for which note (note._id!==id) that note will be returned
    const newNote = notes.filter((note)=>{return note._id!==id});
    setNotes(newNote);
    console.log("A note with id " + id + "has been deleted");
  }

  // Adit a note
  const editNote =  async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${editNotes}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) 
    });
    const json = response.json(); 

    // Editing the note in client side
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if(element._id===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;