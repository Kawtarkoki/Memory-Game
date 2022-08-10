import './App.css';
import {useState, useEffect} from "react";

import Carte  from "./components/Carte.js";


function App() {
  
  const cardImages = [
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SMP/SMP_FR_SM143.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SWSH7/SWSH7_FR_49.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SM75/SM75_FR_1.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SM10/SM10_FR_33.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/DP7/DP7_FR_19.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SM9/SM9_FR_15.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SM8/SM8_FR_133.png",matched: false},
    { "src" : "https://assets.pokemon.com/assets/cms2-fr-fr/img/cards/site_search/SM9/SM9_FR_17.png",matched: false},


  ]
  // store the random cards :
  const [cards, setcards] = useState([]);

  // Tourner carte

  const [tourner, setourner] = useState(0);

  //Make choice

  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);

  // disabled

  const [disabled, setDisabled] = useState(false);


  const MelangerCarte = () => {
    const MelangerCarte = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    
    setcards(MelangerCarte)
    setourner(0)
  }

  //console.log(cards, tourner)
  
  //Make choice

  const handleChoice = (card) => {
    //console.log(card)
    choix1 ? setChoix2(card) :  setChoix1(card)
  }

  // incrementer turn et update choix

  const UpdateTurn = () => {
    setChoix1(null)
    setChoix2(null)
    setourner(preTurn => preTurn + 1)
    setDisabled(false)
  }

  // comparer 2 cartes 
  useEffect(() => {

    if(choix1 && choix2){
      setDisabled(true)
      if(choix1.src === choix2.src){
        console.log("match")
        setcards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choix1.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })


        })
        UpdateTurn()
      }else {
        console.log("Not match ")
        setTimeout(() => UpdateTurn(), 1000 )
      }
     
    }
   
  }, [choix1, choix2])


  // Commencer un jeu automatiquement 
  // useEffect(() => {
  //   MelangerCarte()
  // }, [])


  // console.log(tourner)
 
  return (
    <div className='App'> 
    <br></br>
      <h1>Memory Game</h1>
      <button onClick={MelangerCarte}>  Jouer </button>

      <div className = "card-grid">
        {cards.map(card => (
       <Carte key={card.id} card={card} 
       
       handleChoice={handleChoice}
       flipped={card === choix1 || card === choix2 || card.matched }
       disabled={disabled} 


       />

        ))}

      </div>
      <p>Turns: {tourner}</p>
    </div>
  );
}
export default App;
