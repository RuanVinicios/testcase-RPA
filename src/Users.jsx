import React, { useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar usuários ao clicar no botão
  const fetchUsers = async () => {
    setLoading(true); // Define o estado de carregamento
    setError(null); // Reseta o erro antes da nova tentativa

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data); // Armazena os usuários no estado
    } catch (err) {
      setError('Erro ao buscar usuários. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div>
      <h1>Consumo de Usuários</h1>
      <button
        onClick={fetchUsers}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Lista de Usuários
      </button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Empresa:</strong> {user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
