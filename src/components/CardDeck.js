import React, { useState } from "react";
import cardback from "../Assets/cardback.png";
import Images from "./Imgarray";
import resetsound from "../Sounds/resetsound.mp3";
import clicksound from "../Sounds/clicksound.mp3";
import turnbacksound from "../Sounds/turnbacksound.mp3";
import dealerwon from "../Sounds/dealerwon.mp3";
import playerwin from "../Sounds/playerwin.mp3";

const Deck = () => {
  const [cards, setcards] = useState(["0", "1", "2", "3", "4", "5"]);
  const [cardtype, setcardtype] = useState([]);
  const [slidedown, setslidedown] = useState(false);
  const [turnup, setturnup] = useState(false);
  const [backside, setbackside] = useState(false);
  const [draw, setdraw] = useState(false);
  //Function to lay cards from card deck

  const Laycardshandler = () => {
    var audio = new Audio(clicksound);
    audio.play();

    setslidedown(true);
    setturnup(true);
    const getcard = document.querySelectorAll(".tmp");
    const btn = document.querySelector(".btn");
    const btn2 = document.querySelector(".btn2");
    btn2.classList.remove("nodisplay");
    btn.classList.add("nodisplay");
    btn.innerHTML = `Turn Up`;
    console.log(getcard);
    console.log(getcard.length);
    var i;
    for (i = 0; i < getcard.length; i++) {
      // Method-2
      // getcard[i].classList.add(`translate${i}`);

      //Method-1
      if (i < 5) {
        getcard[i].style.marginTop = "20rem";
        getcard[i].style.marginLeft = `${i * 10}rem`;
      } else {
        getcard[i].style.marginTop = "20rem";
        getcard[i].style.marginLeft = `${-15}rem`;
      }
    }
  };

  //Turning back 1 by 1 approach

  var array = [];
  var tempwinner = [];
  const Showback = (i) => {
    var audio = new Audio(turnbacksound);
    audio.play();
    //console.log(getcard[i].classList);
    const getcard = document.getElementById(i);
    console.log(getcard);
    getcard.classList.add(`rotate`);
    //Getting image
    const image = document.getElementById(`${i}`);
    console.log(image);
    // var indexcalc =
    //   (Math.floor((Math.random() * 10) % 16) *
    //     Math.floor((Math.random() * 10) % 16)) %
    //   16;
    var indexcalc = Math.floor(Math.random() * 51);
    console.log(indexcalc);
    //To ensure each time index is unique to prevent card duplicates
    while (array.find((e) => e === indexcalc) !== undefined) {
      indexcalc = Math.floor(Math.random() * 51);
      console.log(`index calc: ${indexcalc}`);
    }
    console.log(`images length->${Images.length}`);
    setTimeout(() => {
      image.src = Images[indexcalc];
      array.push(indexcalc);
      setcardtype((prev) => [...prev, Images[indexcalc].slice(14, 17)]);
      tempwinner.push(Images[indexcalc].slice(14, 17));
    }, 1000);
  };
  //Function to show cards back side
  const Turnuphandler = () => {
    setbackside(true);

    const getcard = document.querySelectorAll(".tmp");
    console.log(getcard[0].classList);

    //To ensure index is unique
    array = [];

    setTimeout(() => {
      Showback(5);
    }, 500);
    setTimeout(() => {
      Showback(0);
    }, 1500);
    setTimeout(() => {
      Showback(1);
    }, 2500);
    setTimeout(() => {
      Showback(2);
    }, 3500);
    setTimeout(() => {
      Showback(3);
    }, 4500);
    setTimeout(() => {
      Showback(4);
    }, 5500);
    setTimeout(() => {
      const btn = document.querySelector(".btn");
      btn.innerHTML = `Turn back`;
      Getwinner();
    }, 6600);
  };
  //Get Winner Handler function
  const Getwinner = () => {
    //Getting only no from array to priotarise as per nos
    const Winner = tempwinner.map((e) => {
      return e[e.length - 1] === "." ? e.slice(1, 2) : e.slice(-2);
    });
    console.log(`tempwinner: ${tempwinner}`);
    console.log(Winner);
    var audio;
    var maxi = 0; //As max value is at index 0
    var i = 0;
    var maxval = -1000; //To keep track of max value so far
    var draw = false;
    //Index 0 is dealer index
    //So from 1-5 if there is any index with val> index 0,cards are lifted
    for (i = 1; i < tempwinner.length; i++) {
      console.log(Number(Winner[i]));

      //Cards having precedence greater thn dealer card are lifted
      if (Number(Winner[i]) > Number(Winner[maxi])) {
        console.log(`winner${i} as ${Winner[i]}>${Winner[maxi]}`);
        audio = new Audio(playerwin);
        audio.play();
        maxval = Number(Winner[maxi]); //Updating maxval
        const getwinner = document.getElementById(i - 1);
        getwinner.classList.add("win");
      }
      //Condition for draw
      if (
        Number(Winner[i]) === Number(tempwinner[0]) &&
        maxval < Number(tempwinner[0])
      ) {
        draw = true;
        setdraw(true);
      } else if (
        Number(Winner[i]) === Number(tempwinner[0]) &&
        maxval > Number(tempwinner[0])
      ) {
        draw = false;
        setdraw(false);
      }
    }
    console.log(Winner[0]);
    //14 represents A which has highest precedence
    //So if index 0 is 14 or max val is < val at index 0, indicates dealer won
    if (Winner[0] === "14" || (maxval < Number(Winner[0]) && !draw)) {
      audio = new Audio(dealerwon);
      audio.play();
      const getwinner = document.getElementById(5);
      getwinner.classList.add("win");
    }
  };

  //EXTRA
  //Turning back all together

  //  //Function to show cards back side
  //  const Turnuphandler = () => {
  //   var audio = new Audio(turnbacksound);
  //   audio.play();
  //   setbackside(true);
  //   var i;
  //   const getcard = document.querySelectorAll(".tmp");

  //   var i;
  //   //To ensure index is unique
  //   var array = [];
  //   for (i = 0; i < getcard.length; i++) {
  //     //  Method-2 related
  //     //  getcard[i].style.marginTop=`${24}rem`;
  //     // getcard[j--].style.marginLeft=`${j>=3?-(18):18}rem`;

  //     //Method-1
  //     getcard[i].classList.add(`rotate`);

  //     //Temporary loop
  //     for (var j = 0; j < 4; j++) {
  //       console.log("Roating imgs");
  //     }

  //     //Getting image
  //     const image = document.getElementById(`${i}`);
  //     console.log(image);

  //     //Choosing index to allocate image
  //     var indexcalc =
  //       (Math.floor((Math.random() * 10) % 16) *
  //         Math.floor((Math.random() * 10) % 16)) %
  //       16;

  //     //To ensure each time index is unique to prevent card duplicates
  //     while (array.find((e) => e === indexcalc) !== undefined) {
  //       indexcalc =
  //         (Math.floor((Math.random() * 10) % 16) *
  //           Math.floor((Math.random() * 10) % 16)) %
  //         16;
  //     }

  //     //Setting the img
  //     image.src = Images[indexcalc];
  //     array.push(indexcalc);
  //   }

  //   const btn = document.querySelector(".btn");
  //   btn.innerHTML = `Turn back`;
  // };

  //Hide backside one by one approach

  //Function to turn the cards to back side
  const ResetEach = (i) => {
    var audio = new Audio(turnbacksound);
    audio.play();
    const getcard = document.getElementById(i);
    getcard.classList.add("rotate");
    setTimeout(() => {
      const image = document.getElementById(i);
      image.src = cardback;
    }, 1000);
  };

  const Turnbackhandler = (resetreq) => {
    console.log(cardtype);

    setcardtype([]);
    if (resetreq !== "reset") {
      var i = 0;
      const getcard = document.querySelectorAll(".tmp");
      for (i = 0; i < getcard.length; i++) {
        getcard[i].classList.remove(`rotate`);
        getcard[i].classList.remove(`win`);
        getcard[i].classList.remove(`notwon`);
      }
      setTimeout(() => {
        ResetEach(5);
        //  ResetEach(0);
      }, 500);
      setTimeout(() => {
        ResetEach(0);
      }, 1500);
      setTimeout(() => {
        ResetEach(1);
      }, 2500);
      setTimeout(() => {
        ResetEach(2);
      }, 3500);
      setTimeout(() => {
        ResetEach(3);
      }, 4500);
      setTimeout(() => {
        ResetEach(4);
      }, 5500);

      //Removing all kinds of effects
      setTimeout(() => {
        for (i = 0; i < getcard.length; i++) {
          getcard[i].classList.remove(`rotate`);
          getcard[i].classList.remove(`win`);
          getcard[i].classList.remove(`notwon`);
        }
        setbackside(false);
        const btn = document.querySelector(".btn");
        btn.innerHTML = `Turn up`;
      }, 6500);
    } else {
      Turnbackhandler2(resetreq);
    }
  };

  //Hide backside of all cards together approach

  const Turnbackhandler2 = (resetreq) => {
    setdraw(false);
    var audio = new Audio(turnbacksound);
    audio.play();
    var i;
    const getcard = document.querySelectorAll(".tmp");
    for (i = 0; i < getcard.length; i++) {
      getcard[i].classList.remove(`rotate`);
      getcard[i].classList.remove(`win`);
      getcard[i].classList.remove(`notwon`);
    }

    for (i = 0; i < getcard.length; i++) {
      const image = document.getElementById(`${i}`);
      image.src = cardback;
    }
    setbackside(false);
    const btn = document.querySelector(".btn");
    if (resetreq !== "reset") {
      btn.innerHTML = `Turn up`;
    }
  };

  const GetCardsBacktodeck = () => {
    setdraw(false);
    var audio = new Audio(resetsound);
    audio.play();
    //resetsound.play();
    const getcard = document.querySelectorAll(".tmp");
    const btn2 = document.querySelector(".btn2");
    btn2.classList.add("nodisplay");
    const btn = document.querySelector(".btn");
    btn.innerHTML = "Get 5 cards";

    var i;
    Turnbackhandler("reset");
    for (i = 0; i < getcard.length; i++) {
      // Method-2
      // getcard[i].classList.add(`translate${i}`);

      //Method-1
      getcard[i].style.marginTop = "0rem";
      getcard[i].style.marginLeft = `-${0}rem`;
    }
    setturnup(false);
    setslidedown(false);
  };
  return (
    <>
      <div className="container mt-1">
        <div className="row mx-auto me-auto ">
          <div className="col-10 col-lg-3 col-md-3 ms-5 mb-4 mt-4 ">
            <div
              onClick={
                turnup
                  ? backside
                    ? Turnbackhandler
                    : Turnuphandler
                  : slidedown === false
                  ? Laycardshandler
                  : null
              }
            >
              <h3 className="btn">Get 5 cards</h3>
            </div>
            <div onClick={GetCardsBacktodeck}>
              <h3 className="btn2 nodisplay">Reset</h3>
            </div>
          </div>

          {draw ? (
            <div className="col-10 col-lg-3 col-md-3 ms-5 mb-4 mt-4 ">
              <div className="status">
                <h3>DRAW</h3>
              </div>
            </div>
          ) : null}

          <div className="col-10 col-lg-3 col-md-3 ms-5 mb-4 mt-4 "></div>
        </div>
        <div className="row mt-2 ">
          <div className="col-10 col-lg-3 col-md-3 mleft  ">
            <img src={cardback} className="img-fluid abso deck" alt="card" />
            {cards.map((e, i) => {
              return (
                <img
                  key={i + 1000}
                  src={cardback}
                  className="img-fluid abso tmp "
                  id={e}
                  alt="card"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Deck;
