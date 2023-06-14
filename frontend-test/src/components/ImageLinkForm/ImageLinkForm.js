import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return(
        <div>
            <p className='f2 white'>
                This T3 project aims to detect and alter your input design to maximise the use of circular materials !
            </p>
            <p className='f3 white'>
            Click the <a href ='localhost:3001'>link here </a> to browse our online material library
            </p>
            <div className = 'center'>
                <div className = 'center form pa4 br3 shadow-5'>
                    <input className = 'f4 pa2 w-70 center' type = 'tex' placeholder='Enter Here to find out !!!' onChange ={onInputChange}/>
                    <button className = 'w-30 grow f4 link ph3 pv3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div> 
    )
}

export default ImageLinkForm