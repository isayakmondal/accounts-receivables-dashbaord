import React from 'react';
 import img1 from './Img/abc.png';
 import img2 from './Img/logo.svg';
import './Header.css';

function Header(){


    return(
        <>
        <div className="bg">   
            <div className="abc">
            <img src={img1} alt="abc"/> 
            </div>
            <div className="hrc">
            <img src={img2} alt="hrc"/>
            </div>  
        </div>
        <div className='ivl'>
            Invoice List 
            
        </div>
      </>
    )
}
export default Header;