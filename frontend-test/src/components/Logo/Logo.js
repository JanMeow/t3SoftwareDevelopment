import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import ETH from './ETH.png'

const Logo = ()=>{
    return(
        <div className = 'ma4 mt0' >
            <Tilt className ='Tilt br2 shadow-2' options = {{max :45}} style = {{height:140, width:350}}>
            <div className = 'Tilt-inner pa3'>
                <img style={{paddingTop: '1px'}}  alt = {'ETH'} src = {ETH}/>
            </div>
            </Tilt>
        </div>
    )
}

export default Logo 