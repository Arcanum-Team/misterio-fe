import React from 'react';
import '../css/Card.css';

class GCard extends React.Component {
    render(){
        return (
            <div class="cscene">
                <button class="card">
                    <div class={"card__content " + this.props.cardName}>{this.props.cardName}</div>
                </button>
            </div>
        )
    }
}

export default GCard;
