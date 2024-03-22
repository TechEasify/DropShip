import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default () => {
  const [startDate, setStartDate] = useState(new Date('2020/02/08'));
  const [endDate, setEndDate] = useState(new Date('2020/02/10'));
  return (
    <div style={{ display: 'flex', justifyContent: 'between' }}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  );
};
