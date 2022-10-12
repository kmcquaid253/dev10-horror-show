import "./NotFound.css";

import React, { Component } from 'react';

// image import
import CartIcon from './ghost.png';

function NotFound() {


    return (
       
    

      <main>
        <h1 id='titleOne'>404</h1>
        <h2 id='titleTwo'>Boooops!</h2>
        <img src={CartIcon} id='ghostPic'/>
        <h4 id='titleThree'>PAGE NOT FOUND.</h4>
      </main>

    );
  }
  
  export default NotFound;