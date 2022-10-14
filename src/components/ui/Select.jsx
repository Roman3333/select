import React, { useState } from 'react';

import './select.scss';

const Select = ({ setMark, allMarks, allModels, setModel, year, setLoading }) => {
  if (setMark) {
    return (
      <select className="app__select" onChange={(e) => setMark(e.target.value)}>
        {
          <option selected disabled hidden>
            Выберите марку
          </option>
        }
        {allMarks.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  if (setModel) {
    return (
      <select className="app__select" onChange={(e) => setModel(e.target.value)}>
        {
          <option selected disabled hidden>
            Выберите модель
          </option>
        }
        {allModels.map((item, index) => (
          <option value={item.model} key={index}>
            {item.model}
          </option>
        ))}
      </select>
    );
  }

  if (year) {
    return (
      <select className="app__select" onChange={() => setLoading(true)}>
        {
          <option selected disabled hidden>
            Выберите год
          </option>
        }

        <option value={year}>{year}</option>
      </select>
    );
  }
};

export default Select;
