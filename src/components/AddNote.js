import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


function AddNote() {
    const {addNote} = useContext(noteContext);

    const [note, setNote] = useState({title:'', description:'', tag:'General'})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description, note.tag);
    }

    const handleChange = (e) => {
        // this is spread operator, it will add or overwrite
        // name (title, description) and value (title, description) to the note
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div>
            <div className='container my-4'>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
