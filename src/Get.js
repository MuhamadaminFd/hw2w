import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Comp = () => {
  const [data, setData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных!', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (id) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  return (
    <div className="container">
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item.id)}>
              {item.title}
              {selectedItemId === item.id && (
                <div className="details">
                  <p>{item.body}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Comp;
