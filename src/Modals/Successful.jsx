import  { useState } from 'react'
import check from './icons/check.png'

const Successful = () => {
    const [isVisible, setIsVisible] = useState(true)
    const handlebtn = () => {
        setIsVisible(false)
        window.location.reload(false)
    }
    return (
        <div>
            {isVisible && (
                <>
                    <div className="overlay-modal"></div>
                    <div className='popup-container-modal' >
                        <img src ={check} alt ="check"/>
                        <h2>Successful</h2>
                        <p>Deleted Successfully</p>
                        <button className="btns" onClick={handlebtn}>Okay</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Successful
