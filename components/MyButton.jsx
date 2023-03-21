import React from 'react';
import Image from 'next/image';
import btn1 from '../public/img/button/Group44.svg'

function MyButton({children}) {
    return (
        <>
            <div className="myButton">
                <Image src={btn1} className='img11' />
                <div className="myButtonText">{children}</div>
            </div>
        </>
    )
}

export default MyButton