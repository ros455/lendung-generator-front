import React, { useState, useEffect } from 'react';
import style from '../../styles/admin/Timer.module.scss';
function Timer() {
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
      },1000)
  }

  return (
    <div>
        <div className={style.display_time}>
            <h4>Таймер</h4>
            <h4>{days <= 0 ? 0 : days } днів</h4>
            <h4>{hours <= 0 ? 0 : hours} годин</h4>
            <h4>{minutes <= 0 ? 0 : minutes} хвилин</h4>
        </div>
      <div className={style.choise_time}>
        <p>Вибрати дату</p>
        <input type="date" id="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput}/>
        <button onClick={handleUpdateTimer} className={style.handle_edit_button }>Підтвердити зміни</button>
      </div>
    </div>
  );
}

export default Timer;