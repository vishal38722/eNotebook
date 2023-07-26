import React from 'react'

function Alert(props) {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
