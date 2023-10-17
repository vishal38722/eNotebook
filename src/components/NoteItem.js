import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const {deleteNote} = useContext(noteContext);
    const { note, updateNote } = props;
    return (
        // col-md-3 ---> there are 4 columns each of 25% of the full width
        // (full width == 12, i.e. col-md-12 is equivalent to full width column)
        <div className='col-md-3'>
            {/* text-bg-info bg-opacity-25 */}
            <div className="card my-2">
                    <div className="card-body">
                        <h5>{note.title}</h5>
                        <p>{note.description}</p>
                        {/* This icon is for delete */}
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        {/* This icon is for edit */}
                        {/* <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note)}}></i> */}
                        {/* This icon is for edit */}
                        <i className="fa-solid fa-file-pen mx-3" onClick={()=>{updateNote(note)}}></i>
                        {/* Added a feature to convert cursor into pointer for 'i' tag in global css (index.css) */}
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
