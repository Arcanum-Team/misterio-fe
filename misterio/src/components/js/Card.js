import React from 'react';
import '../css/Card.css';

class GCard extends React.Component {
    render(){
        return (
            <div className="cscene">
                <button className="card">
                    <div className={"card__content " + this.props.cardName}>{this.props.cardName}</div>
                </button>
            </div>
        )
    }
}

export default GCard;
