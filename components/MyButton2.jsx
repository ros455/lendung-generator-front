import React from 'react';


function MyButton2({ children, lineHeight, fontSize, fontWeight, btnWidth="100%", btnHeight="200px" }) {
    return (
        <>
            <div className="myButton2Container">
                <div className="myButton2" style={{ backgroundImage: `url(/img/button/Group44.svg)`, backgroundSize: "contain", backgroundPosition: "center", width: `${btnWidth}`, height: `${btnHeight}`, backgroundRepeat: "no-repeat" }}>
                    <div className="myButtonText2" style={{lineHeight: `${lineHeight}px`, fontSize: `${fontSize}px`, fontWeight: `${fontWeight}` }}>{children}</div>
                </div>
            </div>
        </>
    )
}

export default MyButton2