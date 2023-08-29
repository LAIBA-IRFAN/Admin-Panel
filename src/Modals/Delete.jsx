import './Modal.css'
import warning from './icons/warning.png'
import { useState } from 'react'
import Successful from "./Successful"

const Delete = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [showSuccess, setShowSuccess] = useState(false)
    const handleDelete = () => {
        setShowSuccess(true)
        setIsVisible(false)
    }

    return (
        <div>
            {isVisible && (
                <>
                    <div className="overlay-modal"></div>
                    <div className='popup-container-modal'>
                        <img src ={warning} alt="warning" />
                        <h2><b>Delete Student </b></h2>
                        <p>Are you sure you want to delete this?</p>
                        <button className="btn" onClick={handleDelete}>Delete</button>
                        <button className="btn" onClick={() => setIsVisible(false)}>Cancel</button>
                    </div>
                </>
            )}
            {showSuccess && <Successful />}
        </div>
    )
}

export default Delete
