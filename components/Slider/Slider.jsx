import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 3500);
        return () => clearTimeout(timer);
    }, [slideIndex]);

    const nextSlide = () => {
        if (slideIndex !== 3) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === 3) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(3)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    return (
        <div className="container-slider">
            {Array.from({ length: 3 }).map((_, index) => {
                return (
                    <div
                        key={index.toString()}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <Image
                            src={`/img/slider/${index + 1}.jpg`}
                            width={900}
                            height={600}
                            alt="Slider"
                        />
                    </div>
                )
            })}

            <div className="container-dots">
                {Array.from({ length: 3 }).map((item, index) => (
                    <div
                    key={index+100}
                        // onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Slider