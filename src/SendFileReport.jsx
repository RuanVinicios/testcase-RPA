import React, { useState } from 'react';
import axios from 'axios';

const SendFileReport = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendReport = async () => {
    if (!email || !file) {
      setResponseMessage('E-mail e arquivo são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/send-email', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Erro ao enviar relatório. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Enviar Relatório com Arquivo</h1>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o e-mail"
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="file">Arquivo (PDF ou Excel):</label>
        <input
          type="file"
          id="file"
          accept=".pdf,.xls,.xlsx"
          onChange={handleFileChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <button
        onClick={handleSendReport}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Enviar Relatório
      </button>

      {/* Exibe a mensagem de resposta */}
      {responseMessage && (
        <div style={{ marginTop: '20px', color: responseMessage.includes('Erro') ? 'red' : 'green' }}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default SendFileReport;
