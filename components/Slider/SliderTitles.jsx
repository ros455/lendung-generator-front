import React, { useState, useEffect } from 'react';

const titles = ['Дістали відключення ?', 'Неможете планувати життя через постійну можливість відключення?', 'Світло знов зникло без попередження?', "А завтра світло дадуть?", "Захисти свою сім'ю чи бізнес від блекаутів"];


function SliderTitles() {
    const [index, setIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setIndex((index + 1) % titles.length);
                setOpacity(1);
            }, 0);
        }, 3500);

        return () => clearInterval(intervalId);
    }, [index]);
    return (
        <h1
            style={{
                opacity: opacity,
                transition: 'opacity ease-in-out 0.4s',
                textAlign: 'center',
            }}
        >
            {titles[index]}
        </h1>
    )
}

export default SliderTitles