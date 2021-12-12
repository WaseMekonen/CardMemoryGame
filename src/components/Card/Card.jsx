import { Component } from "react";
import "./Card.css";
export default class Card extends Component {
  state={
  }

  render() {
    return this.props.cards.map((card,index) => {
      return (
        <div className="card" key={card.id}>
          <img
            src={card.isFliped?card.img:card.backCardImage}
            alt="image"
            onClick={() => {
              this.props.cardClickHandler(index);
            }}
          />
        </div>
      );
    });
  }
}
