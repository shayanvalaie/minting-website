
import './App.css';
import mintExampleAbi from './mintExampleAbi.json'
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from 'react';

import NftPage from "./components/NftPage"



function App() {
  return (
    <div className="App">
      <NftPage />


    </div>
  );
}

export default App;
