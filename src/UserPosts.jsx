import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [selectedUserId, setSelectedUserId] = useState(null); // ID do usuário selecionado
  const [posts, setPosts] = useState([]); // Posts do usuário
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [averageChars, setAverageChars] = useState(null); // Média de caracteres

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para buscar os posts do usuário selecionado
  const fetchPostsByUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      setPosts(response.data);

      // Calcular a média de caracteres dos textos (body) dos posts
      const totalChars = response.data.reduce((sum, post) => sum + post.body.length, 0);
      const average = totalChars / response.data.length || 0; // Evita divisão por zero
      setAverageChars(average.toFixed(2)); // Arredonda para 2 casas decimais
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar a lista de usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Evento para quando o usuário for selecionado
  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    if (userId) {
      fetchPostsByUser(userId); // Busca os posts do usuário
    } else {
      setPosts([]);
      setAverageChars(null);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Obter Posts por Usuário</h1>

      {/* Dropdown para selecionar o usuário */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="user-select">Selecione um Usuário:</label>
        <select
          id="user-select"
          value={selectedUserId || ''}
          onChange={handleUserSelect}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">-- Selecione --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exibir estado de carregamento */}
      {loading && <p>Carregando posts...</p>}

      {/* Exibir posts */}
      {!loading && posts.length > 0 && (
        <div>
          <h2>Posts do Usuário {selectedUserId}</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  textAlign: 'left',
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>

          {/* Exibir média de caracteres */}
          <div style={{ marginTop: '20px' }}>
            <h3>Média de Caracteres dos Posts:</h3>
            <p>
              O usuário <strong>{selectedUserId}</strong> possui uma média de{' '}
              <strong>{averageChars || '0'}</strong> caracteres por post.
            </p>
          </div>
        </div>
      )}

      {/* Exibir mensagem caso não haja posts */}
      {!loading && selectedUserId && posts.length === 0 && <p>Nenhum post encontrado para este usuário.</p>}
    </div>
  );
};

export default UserPosts;
