import React from 'react'
import NFT from "../NFT.jpg"
import mintExampleAbi from '../mintExampleAbi.json'
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';


function NftPage() {
    const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    //CONNECTING APP TO BLOCKCHAIN
    const [accounts, setAccounts] = useState([])

    async function connectAccounts() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts);
        }
    }

    useEffect(() => {
        connectAccounts();
    }, [])

    // MINTING
    const [mintAmount, setMintAmount] = useState(1);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                mintExampleAddress,
                mintExampleAbi.abi,
                signer


            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log("response:", response);
            } catch (err) {
                console.log("error:", err);
            }
        }
    }
    return (
        <div>

            <h1>{accounts.length == 0 ? "Please Log In" : "CHOOSE MINTING AMOUNT"}</h1>
            <img style={{ marginTop: "20px" }} src={NFT} alt="" />
            <div>

                {accounts.length > 0 ? (

                    <div style={{ marginTop: "50px" }}>
                        <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center" }}>
                            {mintAmount >= 1 ? <button onClick={() => setMintAmount(mintAmount - 1)}> - </button> : ""}
                            {mintAmount == 0 ? "" : <p style={{ position: "absolute" }}>{mintAmount}</p>}
                            <button style={{ position: "relative" }} onClick={() => setMintAmount(mintAmount + 1)}> + </button>


                        </div>

                        <div style={{ marginTop: "50px", letterSpacing: "20px", display: "flex", justifyContent: "center" }}>
                            <button style={{ letterSpacing: "2px", display: "flex", justifyContent: "center" }} onClick={handleMint}>MINT </button>
                        </div>
                    </div>

                ) : ""}
            </div>

        </div>
    )
}

export default NftPage