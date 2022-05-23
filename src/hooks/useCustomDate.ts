import { useEffect, useRef, useState } from 'react'

export const useCustomDate = () => {
  const [toDate, setToDate] = useState('');
  const [toClock, setToClock] = useState('');
  const [reLoad, setReLoad] = useState(false);

  let setTimer: React.MutableRefObject<any> = useRef(null);
  
  useEffect(() => {    
    setTimer.current = setInterval(() => {
      const today = new Date();
      let seconds = today.getSeconds();      
      if (seconds === 0) {
        setReLoad((prev) => !prev);
      }
    }, 1000);
    return () => clearInterval(setTimer.current);
  }, []);

  useEffect(() => {
    const today = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    let month = (today.getMonth() + 1).toString();
    let date = today.getDate().toString();
    let day = today.getDay();
    let hour = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let dayStr = days[day];

    [month, date] = setFormat(month, date);
    [hour, minutes] = setFormat(hour, minutes);

    const dateStr = `${month}.${date}(${dayStr})`;
    const clockStr = `${hour}:${minutes}`;

    setToDate(dateStr);
    setToClock(clockStr);
  }, [reLoad]);

  return { toDate, toClock };
}

function setFormat(str1: string, str2: string) {
  const formatStrA = str1.length < 2 ? `0${str1}` : `${str1}`;
  const formatStrB = str2.length < 2 ? `0${str2}` : `${str2}`;
  return [formatStrA, formatStrB];
}
