import React from 'react';


function MyButtonTop({ children, lineHeight, fontSize, fontWeight, btnWidth="100%", btnHeight="200px" }) {
    return (
        <>
            <div className="MyButtonTopContainer">
                <div className="MyButtonTop" style={{ backgroundImage: `url(/img/button/mainTop.svg)`, backgroundSize: "contain", backgroundPosition: "center", width: `${btnWidth}`, height: `${btnHeight}`, backgroundRepeat: "no-repeat" }}>
                    <div className="MyButtonTopText" style={{lineHeight: `${lineHeight}px`, fontSize: `${fontSize}px`, fontWeight: `${fontWeight}` }}>{children}</div>
                </div>
            </div>
        </>
    )
}

export default MyButtonTop