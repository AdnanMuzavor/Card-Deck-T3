import React, { useEffect, useState } from "react";
import Deck from "../components/CardDeck";
const HomeScreen = () => {
  return (
    <>
      <div className="row d-flex flex-direction-row justify-content-center">
        <Deck />
      </div>
    </>
  );
};

export default HomeScreen;
