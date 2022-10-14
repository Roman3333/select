import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';

import data from './cars.json';
import Select from './components/ui/Select';

import './scss/main.scss';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [cars, setCars] = useState(data.cars);
  const [allMarks, setAllMarks] = useState(['audi', 'ВАЗ']);
  const [mark, setMark] = useState(null);
  const [allModels, setAllModels] = useState([]);
  const [model, setModel] = useState(null);
  const [allYears, setAllYears] = useState([]);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const circleRef = useRef(null);
  const app = useRef(null);
  const container = useRef(null);
  const calendar = useRef(null);
  const info = useRef(null);
  const [date, setDate] = useState();
  const [startDate, setStardDate] = useState();
  const [endDate, setEndDate] = useState();

  const showForm = () => {
    circleRef.current.classList.add('invisible');
    container.current.classList.add('active');
  };

  const showCalendar = () => {
    calendar.current.classList.add('active');
  };

  const sendForm = (e) => {
    setDate(e);
    let a = document.querySelector('.react-calendar');
    let b = document.querySelectorAll('.app__select');
    let c = document.querySelector('.app__button');

    a.classList.add('hidden');
    b.forEach((select) => select.classList.add('hidden'));
    c.classList.add('hidden');
    info.current.classList.add('active');
  };

  const startAgain = () => {
    app.current.classList.remove('active');
    info.current.classList.remove('active');
    circleRef.current.classList.remove('invisible');
    container.current.classList.remove('active');
    let a = document.querySelector('.react-calendar');
    let b = document.querySelectorAll('.app__select');
    let c = document.querySelector('.app__button');
    setMark('');
    setAllModels([]);
    setModel(null);
    setAllYears([]);
    setYear('');
    setLoading(false);
    a.classList.remove('hidden');
    a.classList.remove('active');
    b.forEach((select) => select.classList.remove('hidden'));
    c.classList.remove('hidden');
    info.current.classList.remove('active');

    setTimeout(() => {
      app.current.classList.add('active');
    }, 3400);
  };

  useEffect(() => {
    app.current = document.querySelector('.app');
    info.current = document.querySelector('.app__info');
    circleRef.current = document.querySelector('.app__circle');
    container.current = document.querySelector('.container');
    calendar.current = document.querySelector('.react-calendar');

    setTimeout(() => {
      app.current.classList.add('active');
    }, 3400);
  }, []);

  useEffect(() => {
    let models = cars.filter((item) => item.mark == mark);
    setAllModels(models);
  }, [mark]);

  useEffect(() => {
    if (model) {
      let models = cars.filter((item) => item.mark == mark);
      setYear(models[0].year);
    }
  }, [mark]);

  useEffect(() => {
    if (model) {
      let getYear = allModels.find((item) => item.model == model);
      let modelDate = cars.find((item) => item.model == model);

      let dateYearStart = modelDate.delivery.slice(6, 10);
      let dateMonthStart = modelDate.delivery.slice(4, 5);
      let dateDateStart = modelDate.delivery.slice(0, 2);
      let currectStartDate = `${dateYearStart},${dateMonthStart},${dateDateStart}`;
      let dateYearEnd = modelDate.delivery.slice(17, 21);
      let dateMonthEnd = modelDate.delivery.slice(14, 16);
      let dateDateEnd = modelDate.delivery.slice(11, 13);
      let currectEndDate = `${dateYearEnd},${dateMonthEnd},${dateDateEnd}`;

      setStardDate(new Date(currectStartDate));
      setEndDate(new Date(currectEndDate));
      setYear(getYear.year);
      setDate(new Date(currectStartDate));
      console.log(date);
    }
  }, [model]);

  return (
    <div className="app">
      <div className="app__squares">
        <div id="square-1" className="app__square"></div>
        <div id="square-2" className="app__square"></div>
        <div id="square-3" className="app__square"></div>
        <div id="square-4" className="app__square"></div>
      </div>
      <div id="circle" className="app__circle" onClick={showForm}>
        <div className="app__circle-text">Нажать</div>
      </div>
      <div className="container">
        <Select allMarks={allMarks} setMark={setMark} />
        <Select allModels={allModels} setModel={setModel} />
        <Select year={year} setLoading={setLoading} />
        {mark && model && loading ? (
          <button onClick={showCalendar} className="app__button">
            Доставить
          </button>
        ) : (
          ''
        )}
        <Calendar
          minDate={startDate}
          maxDate={endDate}
          defaultActiveStartDate={startDate}
          onChange={sendForm}
        />
      </div>
      <div className="app__info">
        {`Вы выбрали ${mark} ${model} ${year}, доставка ${String(date).slice(4, 15)}`}{' '}
        <span className="app__again" onClick={startAgain}>
          начать заново
        </span>
      </div>
    </div>
  );
}

export default App;
