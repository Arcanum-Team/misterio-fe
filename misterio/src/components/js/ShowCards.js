import React from 'react';
import Card from './Card.js';

class ShowCards extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            cards: [],
        };
    }
  
    componentDidMount() {
      const requestOptions = {
          method: 'GET',
          mode: 'cors',
          headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      };
  
      fetch(
          "http://127.0.0.1:8000/api/v1/cards/" + this.props.playerId , requestOptions)
          .then((res) => res.json())
          .then((json) => {
            this.props.parentCallback(json)
            this.setState({
              cards: [].concat(json)
            })
          })
    }  

    render(){
        return (
            <div>
                {this.state.cards.map((card, i) => ( 
                    < Card cardName = { card.name } key={card.name}/>
                ))}
            </div>
        )
    }
}

export default ShowCards;