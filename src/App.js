import './App.css';
import { useState } from 'react';

import Chart from './components/chart'
import Dropdown from './components/dropdown'

const dropdownArray = [
  { display: 'Moneyline', value: 'home_win_pct' },
  { display: 'Total', value: 'over_win_pct' },
  { display: 'Spread', value: 'home_spread_win_pct' },
]

function App() {
  const [filter, handleFilter] = useState(dropdownArray[0]);

  return (
    <div className="App">
      <header className="App-header">
        <Chart type={filter}/>
        <p>Prop Type:</p>
        <Dropdown items={dropdownArray} selected={filter} handleClick={val => handleFilter(val)} />
      </header>
    </div>
  );
}

export default App;
