import React from "react";

const Dice =(props)=>{
    const styles = {
        backgroundColor: props.isHeld? "#59E391":"#dad8d8"
    }
    return (
        <main>
            <div 
            style={styles}
            onClick={props.onClick} 
            className="die">
                <h4>
                {props.value}
                </h4>
            
            </div>
        </main>
    )
}

export default Dice