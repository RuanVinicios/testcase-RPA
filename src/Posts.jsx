import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os posts da API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data); // Armazena os posts no estado
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Exibição de carregamento ou erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  // Exibição da lista de posts
  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;