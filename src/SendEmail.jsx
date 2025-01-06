import axios from 'axios';

const enviarRelatorio = async () => {
  try {
    const response = await axios.post('http://localhost:4000/send-email', {
      email: 'exemplo@email.com',
      reportType: 'Relatório de Vendas'
    });

    console.log(response.data);
    alert(response.data.message);
  } catch (error) {
    console.error('Erro ao enviar relatório:', error);
    alert('Falha ao enviar relatório.');
  }
};

// Chame a função quando necessário, como em um clique de botão
<button onClick={enviarRelatorio}>Enviar Relatório</button>;
