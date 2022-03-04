import React from "react";

const Dice =(props)=>{
    const styles = {
        backgroundColor: props.isHeld? "#59E391":"#dad8d8"
    }
    return (
        <main>
            <div style={styles} className="die">
                <h4>
                {props.value}
                </h4>
            
            </div>
        </main>
    )
}

export default Dice