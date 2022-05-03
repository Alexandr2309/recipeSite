import { useState, useId, useRef } from 'react';
import './App.css';
import Burger from './components/burger/burger';
import Post from './components/Post/Post';
import Posts from './components/Posts';

function App() {
  const [state, setState] = useState(false);
  const [posts, setPosts] = useState([
    { id: useId(), title: 'Первое', author: "Коломыцкий А.М", date: Date.now() - 100000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: './logo512.png' },
    { id: useId(), title: 'Второе', author: "Коломыцкая Л.В", date: Date.now() - 10, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: './logo512.png' },
    { id: useId(), title: 'Третье', author: "Джиба С.Е", date: Date.now() - 150000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: './logo512.png' }
  ])
  return (
    <div className="App">
      <Posts posts={posts} />
    </div>
  );
}

export default App;
