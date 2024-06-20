import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import "./style.css"

const Home = () => {
  const [month, setMonth] = useState('3');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState({});
  const [pieChart, setPieChart] = useState({});

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`http://localhost:8000/transactions`, { page, search, month });
      setTransactions(res.data);
      const res1 = await axios.post('http://localhost:8000/combined', { month });
      setStatistics(res1.data.statistics);
      setBarChart(res1.data.barChart);
      setPieChart(res1.data.pieChart);
    };
    fetchData();
  }, [month, search, page]);



  return (
    <div>
      <div className='cont-circle'>
        <div className='circle'>
          Transaction Dashboard
        </div>
      </div>
      <div className='action-container'>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search transaction"
        />
        <select value={month} onChange={e => setMonth(e.target.value)}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(m => (
            <option key={m} value={m}>
              {new Date(0, m - 1).toLocaleString('en', { month: 'long' })}
            </option>
          ))}
        </select>

      </div>
      <Table transactions={transactions} />
      <div className='pagination'>
        <div>Page:{page}</div>
        <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <span> - </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
        
        <div>Per Page:10</div>
      </div>

      <Statistics statistics={statistics} month={month}/>
      <BarChart data={barChart} month={month}/>
      <PieChart data={pieChart} month={month}/>
    </div>
  );
}

export default Home;
