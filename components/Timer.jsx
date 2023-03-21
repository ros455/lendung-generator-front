import React, {useEffect, useState} from 'react'

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [fullDate, setFullDate] = useState({});
    const [dateInput, setDateInput] = useState('');

    useEffect(() => {
        fetch('https://lending-generator-server.herokuapp.com/get-timer')
            .then((res) => res.json())
            .then((res) => {
                setFullDate(res)
            })
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(fullDate.timer).getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [fullDate.timer]);

    const handleUpdateTimer = () => {
        fetch('https://lending-generator-server.herokuapp.com/update-timer', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ timer: dateInput })
        })
            .then((res) => res.json())
            .then((res) => {
                setFullDate(res)
            })
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    return (
        <div className='timer'>
            <div className="timer__container">
                <div className="timer__body">
                    <div className="timer__title">ДО КІНЦЯ АКЦІЇЇ ЗАЛИШИЛОСЬ</div>
                    <div className="timer__numbers-block">
                        <div className="timer__numbers-cell">
                            <div className="timer__number">{days === NaN || isNaN(days) ? 1 : days}</div>
                            <div className="timer__text">днів</div>
                        </div>
                        <div className="timer__numbers-cell">
                            <div className="timer__number">{hours === NaN || isNaN(hours) ? 4 : hours}</div>
                            <div className="timer__text">годин</div>
                        </div>
                        <div className="timer__numbers-cell">
                            <div className="timer__number">{minutes === NaN || isNaN(minutes) ? 24 : minutes}</div>
                            <div className="timer__text">хвилин</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer