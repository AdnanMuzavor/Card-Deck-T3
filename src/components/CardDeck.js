import React, { useState } from "react";
import cardback from "../Assets/cardback.png";
import Images from "./Imgarray";
import resetsound from "../Sounds/resetsound.mp3";
import clicksound from "../Sounds/clicksound.mp3";
import turnbacksound from "../Sounds/turnbacksound.mp3";
const Deck = () => {
  const [slidedown, setslidedown] = useState(false);
  const [turnup, setturnup] = useState(false);
  const [backside, setbackside] = useState(false);

  //Function to lay cards from card deck

  const Laycardshandler = () => {
    var audio = new Audio(clicksound);
    audio.play(); 

    setslidedown(true);
    setturnup(true);
    const getcard = document.querySelectorAll(".tmp");
    const btn = document.querySelector(".btn");
    const btn2=document.querySelector(".btn2");
    btn2.classList.remove("nodisplay");
    btn.classList.add("nodisplay");
    btn.innerHTML = `Turn Up`;
    var i;
    for (i = 0; i < getcard.length; i++) {
      // Method-2
      // getcard[i].classList.add(`translate${i}`);

      //Method-1
      getcard[i].style.marginTop = "20rem";
      getcard[i].style.marginLeft = `${i * 10}rem`;
    }
  };

  //Function to show cards back side
  const Turnuphandler = () => {
    var audio = new Audio(turnbacksound);
    audio.play(); 
    setbackside(true);
    var i;
    const getcard = document.querySelectorAll(".tmp");

    var i;
    //To ensure index is unique
    var array = [];
    for (i = 0; i < getcard.length; i++) {
      //  Method-2 related
      //  getcard[i].style.marginTop=`${24}rem`;
      // getcard[j--].style.marginLeft=`${j>=3?-(18):18}rem`;

      //Method-1
      getcard[i].classList.add(`rotate`);

      //Temporary loop
      for (var j = 0; j < 4; j++) {
        console.log("Roating imgs");
      }

      //Getting image
      const image = document.getElementById(`${i}`);
      console.log(image);

      //Choosing index to allocate image
      var indexcalc =
        (Math.floor((Math.random() * 10) % 16) *
          Math.floor((Math.random() * 10) % 16)) %
        16;

      //To ensure each time index is unique to prevent card duplicates
      while (array.find((e) => e === indexcalc) !== undefined) {
        indexcalc =
          (Math.floor((Math.random() * 10) % 16) *
            Math.floor((Math.random() * 10) % 16)) %
          16;
      }

      //Setting the img
      image.src = Images[indexcalc];
      array.push(indexcalc);
    }

    const btn = document.querySelector(".btn");
    btn.innerHTML = `Turn back`;
  };

  //Function to turn the cards to back side
  const Turnbackhandler = (resetreq) => {
    var audio = new Audio(turnbacksound);
    audio.play(); 
    const getcard = document.querySelectorAll(".tmp");
    for (i = 0; i < getcard.length; i++) {
      getcard[i].classList.remove(`rotate`);
    }

    // const getcard = document.querySelectorAll(".tmp");
    var i;
    for (i = 0; i < getcard.length; i++) {
      // getcard[i].classList.add(`rotate`);
      const image = document.getElementById(`${i}`);
      image.src = cardback;
    }
    setbackside(false);
    const btn = document.querySelector(".btn");

    // for (i = 0; i < getcard.length; i++) {
    //   getcard[i].classList.remove(`rotate`);
    // }
    if(resetreq!=="reset"){
      btn.innerHTML = `Turn up`;
    }
   
  };

  const GetCardsBacktodeck = () => {
    var audio = new Audio(resetsound);
    audio.play(); 
    //resetsound.play();
    const getcard = document.querySelectorAll(".tmp");
    const btn2=document.querySelector(".btn2");
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
          
          
         
        </div>
        <div className="row mt-2 ">
          <div className="col-10 col-lg-3 col-md-3 ms-5  ">
            <img src={cardback} className="img-fluid abso deck" />
            <img src={cardback} className="img-fluid abso tmp" id="0" />
            <img src={cardback} className="img-fluid abso tmp" id="1" />
            <img src={cardback} className="img-fluid abso tmp" id="2" />
            <img src={cardback} className="img-fluid abso tmp" id="3" />
            <img src={cardback} className="img-fluid abso tmp" id="4" />
          </div>
         
      
        </div>
      </div>
    </>
  );
};

export default Deck;
