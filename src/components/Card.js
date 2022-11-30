import cover from "../Images/m9.jpg";
import  "../css/Card.css"

const Card = ({card , selectHandle , flipped , disabled}) => {

    const handleClick = () =>
    {
        if(!disabled)
        {
            selectHandle(card)
        }
        
    }
    
    return (
         
            <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front"  src={card.src}  alt='card-front'/>
                <img className='back' onClick={handleClick} src={cover} alt='card-back'/>
            </div>
            </div>
    );
};

export default Card;