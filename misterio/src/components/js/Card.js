import React from 'react';
import detective from '../detective.png';
import '../css/Card.css';

class Card extends React.Component {
    render(){
        return (
            <div class="image-area">
        <div class="img-wrapper">
            <img src={detective} alt="detective" />
            <h2>Nickname</h2>
        </div>
    </div>
    );
  }
}

export default Card;
