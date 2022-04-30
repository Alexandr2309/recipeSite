import { useState } from 'react';
import './App.css';
import Burger from './components/burger/burger';

function App() {
  const [state, setState] = useState(false);
  return (
    <div className="App">
      <Burger
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default App;
