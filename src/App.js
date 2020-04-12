import React, { useState, useEffect } from "react";
import api from './services/api';
import { FaRegHeart } from 'react-icons/fa';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `projeto adicionado pelo front ${Date.now()}`,
      url: "https://github.com/brunosprotte/desafio-conceitos-reactjs",
      techs: ["React", "ReactJS", "Node"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const repo = response.data;
    const newRepositories = repositories.filter(repo => repo.id !== id);

    setRepositories([...newRepositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`, id);
    const newRepositories = repositories.filter(repo => repo.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>
          {repo.title}
          <button data-testid={`like-button-${repo.id}`} onClick={() => handleLikeRepository(repo.id)}>
            <FaRegHeart /><label data-testid={`like-label-${repo.id}`}>{repo.likes}</label>
          </button>
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
