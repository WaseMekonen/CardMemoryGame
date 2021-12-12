import { Component } from "react";
import Card from "../Card/Card";
import Message from "../Message/Message";
import "./CardMemoryGame.css";

export default class CardGameMemory extends Component {
  state = {
    cards: [
      {
        id: "asxs",
        img: "https://cdn.pixabay.com/photo/2016/04/26/16/58/coffe-1354786__340.jpg",
        value: "Coffee",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
      {
        id: "jhsdm",
        img: "https://cdn.pixabay.com/photo/2016/04/26/16/58/coffe-1354786__340.jpg",
        value: "Coffee",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
      {
        id: "ghsasa",
        img: "https://cdn.pixabay.com/photo/2019/06/17/20/13/soft-drink-4280835__340.jpg",
        value: "Cola",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
      {
        id: "asdmxzc",
        img: "https://cdn.pixabay.com/photo/2019/06/17/20/13/soft-drink-4280835__340.jpg",
        value: "Cola",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
      {
        id: "maskc",
        img: "https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg",
        value: "Tea",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
      {
        id: "opasnu",
        img: "https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg",
        value: "Tea",
        backCardImage:
          "https://cdn.pixabay.com/photo/2016/11/29/12/34/christmas-1869533__340.png",
        isFliped: false,
      },
    ],
    timer: 0,
    turns: 0,
    pairsCounter: 1,
    isPlayerWon: false,
  };

  selectedCardValue = null;
  selectedCardId = null;
  selectedCardIndex = null;
  timerId = null;
  pairs = 3;

  cardClickHandler = (index) => {
    const newCardsArr = [...this.state.cards];
    newCardsArr[index].isFliped = true;
    if (this.selectedCardValue == null) {
      this.selectedCardValue = newCardsArr[index].value;
      this.selectedCardId = newCardsArr[index].id;
      this.selectedCardIndex = index;
    } else if (
      this.selectedCardValue == newCardsArr[index].value &&
      newCardsArr[index].id !== this.selectedCardId
    ) {
      this.selectedCardValue = null;
      this.setState({ turns: this.state.turns + 1 });
      this.setState({ pairsCounter: this.state.pairsCounter + 1 });
      if (this.state.pairsCounter == this.pairs) {
        this.setState({ isPlayerWon: true });
        this.isGameOver();
      }
    } else if (newCardsArr[index].id == this.selectedCardId) {
      newCardsArr[index].isFliped = true;
    } else {
      this.selectedCardValue = null;
      setTimeout(() => {
        newCardsArr[index].isFliped = false;
        newCardsArr[this.selectedCardIndex].isFliped = false;
      }, 600);
      this.setState({ turns: this.state.turns + 1 });
    }
  };

  startGame = () => {
    this.timer();
    this.shuffleCards();
  };

  isGameOver = () => {
    clearInterval(this.timerId);
    setTimeout(() => {
      this.resetCardsToDefault();
      this.setState({ turns: 0 });
      this.setState({ timer: 0 });
      this.setState({ isPlayerWon: false });
    }, 3000);
  };

  shuffleCards = () => {
    for (let i = this.state.cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.state.cards[i], this.state.cards[randomIndex]] = [
        this.state.cards[randomIndex],
        this.state.cards[i],
      ];
    }
  };

  timer = () => {
    this.timerId = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  };

  resetCardsToDefault = () => {
    const defaultArr = [...this.state.cards];
    for (let i = 0; i < defaultArr.length; i++) {
      defaultArr[i].isFliped = false;
    }
    this.setState({ cards: defaultArr });
  };

  

  render() {
    const { cards } = this.state;
    return (
      <div>
        <div className="container">
          <Card
            cards={cards}
            timerId={this.timerId}
            timer={this.state.timer}
            cardClickHandler={this.cardClickHandler}
          />
        </div>
        <Message
          timer={this.state.timer}
          turns={this.state.turns}
          isPlayerWon={this.state.isPlayerWon}
          startGame={this.startGame}
        />
      </div>
    );
  }
}
