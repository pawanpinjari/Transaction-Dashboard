import React from 'react';

const Statistics = ({ statistics, month }) => {

  return (
    <div className='stat-main'>
      <h2>Statistics - {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}</h2>
      <div className='stat-cont'>
        <p><div>Total Sale :</div><div>{statistics.statAmount}</div> </p>
        <p><div>Total Sold Items:</div><div> {statistics.statSoldItems}</div></p>
        <p><div>Total Not Sold Items:</div><div> {statistics.statNotSoldItems}</div></p>
      </div>

    </div>
  );
}

export default Statistics;
