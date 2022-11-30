import React, { useEffect, useState } from 'react';
import "../css/Playground.css";
import Card from './Card';
import MyImage1 from "../Images/m4.jpg";
import MyImage2 from "../Images/m2.jpg";
import MyImage3 from "../Images/m8.jpg";
import MyImage4 from "../Images/m6.jpg";
import MyImage5 from "../Images/m5.jpg";
import MyImage6 from "../Images/m7.jpg";

const cardImages =[
  {"src":MyImage1 , matched:false},
  {"src":MyImage2 , matched:false},
  {"src":MyImage3 , matched:false},
  {"src":MyImage4 , matched:false},
  {"src":MyImage5 , matched:false},
  {"src":MyImage6 , matched:false}
]

const Playground = () => {
    const [cards , setCards] = useState([]);
  const [turn , setTurn] = useState(0);
  const [firsSelect , setFirstSelect] = useState(null)
  const [secondSelect , setSecondSelect] = useState(null)
  const [disabled , setDisabled] = useState(false)
  
  const shuffle = () =>
  {
    const shuffle = [...cardImages , ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=> ({...card , id:Math.random()}))
    setFirstSelect(null)
    setSecondSelect(null)
    setCards(shuffle)
    setTurn(0)
  }



  const selectHandle = (card) =>
  {
   
    firsSelect ? setSecondSelect(card) : setFirstSelect(card); 
  }

  useEffect(()=>{
    if(firsSelect && secondSelect)
    {
      if (firsSelect.src === secondSelect.src)
      {
        setDisabled(true)
        setCards(prevCards => {
          return prevCards.map(card=>
            {
              if (card.src === firsSelect.src)
              {
                return {...card , matched:true}
              }
              else
              {
                return card
              }
             
            })
        })
          reset()
      }
      setTimeout(()=> reset() , 1000)
    }

    
  } , [firsSelect , secondSelect])

  const reset = () =>
  {
    setFirstSelect(null);
    setSecondSelect(null);
    setTurn(prevTurn=> prevTurn + 1)
    setDisabled(false)
  }

  useEffect(()=>
  {
    shuffle()
  },[])

  return (
    <div className='play-ground'> 
      <h2>memory game</h2>
      <button onClick={shuffle}>reset</button>
      <div  className='card-grid'>
      {
        cards.map((card)=>
        
        (<Card  
        key={card.id}
        card={card}
        selectHandle={selectHandle}
        flipped={card===firsSelect || card===secondSelect || card.matched}
        disabled={disabled}
        />
       
        )
        
        )
       
      }
        </div>
        <p>turns: {turn}</p>
    </div>
  );
};

export default Playground;