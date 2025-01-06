import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importa o plugin para jsPDF

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]); // Estatísticas dos usuários
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false); // Estado para controlar a visibilidade dos dados

  // Função para buscar os dados da API
  const fetchUsers = async () => {
    if (showData) {
      // Se os dados já estiverem visíveis, esconda-os
      setShowData(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [userResponse, postResponse] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
      ]);

      const usersData = userResponse.data;
      const postsData = postResponse.data;

      // Calcula a quantidade de posts e média de caracteres por usuário
      const stats = usersData.map((user) => {
        const userPosts = postsData.filter((post) => post.userId === user.id);
        const totalChars = userPosts.reduce((sum, post) => sum + post.body.length, 0);
        const averageChars = userPosts.length > 0 ? (totalChars / userPosts.length).toFixed(2) : '0.00';
        return {
          id: user.id,
          name: user.name,
          postCount: userPosts.length,
          averageChars,
        };
      });

      setUsers(usersData);
      setUserStats(stats);
      setShowData(true); // Exibe os dados
    } catch (err) {
      setError('Erro ao buscar os usuários ou posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar o relatório em Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      userStats.map((stat) => ({
        "ID do Usuário": stat.id,
        "Nome do Usuário": stat.name,
        "Quantidade de Posts": stat.postCount,
        "Média de Caracteres dos Posts": stat.averageChars,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Relatório_Usuários.xlsx');
  };

  // Função para salvar o relatório em PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Usuários', 10, 10);

    const tableColumn = [
      'ID do Usuário',
      'Nome do Usuário',
      'Quantidade de Posts',
      'Média de Caracteres dos Posts',
    ];
    const tableRows = userStats.map((stat) => [
      stat.id,
      stat.name,
      stat.postCount,
      stat.averageChars,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('Relatório_Usuários.pdf');
  };

  return (
    <div>
      <h1>Relatório de Usuários</h1>
      <button
        onClick={fetchUsers}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          marginRight: '10px',
        }}
      >
        {showData ? 'Ocultar Usuários' : 'Buscar Usuários'}
      </button>
      <button
        onClick={exportToExcel}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        disabled={userStats.length === 0}
      >
        Exportar para Excel
      </button>
      <button
        onClick={exportToPDF}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#DC3545',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={userStats.length === 0}
      >
        Exportar para PDF
      </button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showData && userStats.length > 0 && (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID do Usuário</th>
              <th>Nome do Usuário</th>
              <th>Quantidade de Posts</th>
              <th>Média de Caracteres dos Posts</th>
            </tr>
          </thead>
          <tbody>
            {userStats.map((stat) => (
              <tr key={stat.id}>
                <td>{stat.id}</td>
                <td>{stat.name}</td>
                <td>{stat.postCount}</td>
                <td>{stat.averageChars}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserReport;
