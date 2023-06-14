import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl, box})=>{
    const drawbox = (box)=>{
        if (Array.isArray(box)){
            const drawBox = box.map((d, index) =><div key = {100 + index } className = 'bounding-box' style = {{top: d.toprow, right: d.rightcol, bottom: d.btmrow, left : d.leftcol}}></div>)
            return drawBox
        }else{
            return false
        }
    }
    const boxOnScreen = drawbox(box)

    return(
        <div className = 'center ma'>
            <div className='absolute mt2'>
                <img id = 'inputimage' src= {imageUrl} alt="Recognised Output"  width = '800px' height = 'auto'></img>
                {boxOnScreen}
            </div>
        </div>
    )
}

export default FaceRecognition