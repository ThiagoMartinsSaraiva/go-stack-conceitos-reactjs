import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', {
      title: `new repo ${Date.now()}`,
      url: 'repo url',
      techs: ['JS', 'React', 'ReactJS', 'Node.js']
    })

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(r => r.id === id)
    if (repositoryIndex > -1) {
      repositories.splice(repositoryIndex, 1)
      setRepositories([...repositories])
      await api.delete(`/repositories/${id}`)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
