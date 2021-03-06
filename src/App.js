import React, { useState, useEffect } from "react";
import api from "services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const repository = await api.post('repositories',{
      url: "www.teste.com.br",
      title: "teste",
      techs: ["a", "b"]
    });
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const listRemoveRepositories = repositories;
    const index = repositories.findIndex(repository => repository.id === id);
    listRemoveRepositories.splice(index,1);
    setRepositories([...listRemoveRepositories]); 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
