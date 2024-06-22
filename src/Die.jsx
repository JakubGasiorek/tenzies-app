/* eslint-disable react/prop-types */

export default function Die(props) {
    return (
        <div 
            className="die-face" 
            style={{backgroundColor: props.isHeld ? "#59E391" : "#fff"}} 
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}