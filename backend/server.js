const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuração do multer
const upload = multer({ dest: 'uploads/' });

// Endpoint para envio de e-mail com arquivos
app.post('/send-email', upload.single('file'), (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ success: false, message: 'E-mail e arquivo são obrigatórios.' });
  }

  // Simulação de envio
  console.log(`Enviando arquivo "${file.originalname}" para o e-mail "${email}".`);

  return res.status(200).json({
    success: true,
    message: `Arquivo "${file.originalname}" enviado para ${email}!`,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota GET para a raiz do servidor
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor! Utilize o endpoint POST /send-email para enviar relatórios.');
});

// Endpoint fictício para envio de e-mail
app.post('/send-email', (req, res) => {
  const { email, reportType } = req.body;

  // Simulação de envio
  console.log(`Enviando relatório do tipo "${reportType}" para o e-mail "${email}".`);

  // Resposta fictícia
  return res.status(200).json({
    success: true,
    message: `Relatório enviado para ${email}!`,
  });
});

// Inicia o servidor na porta 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const enviarRelatorio = async () => {
  try {
    const response = await axios.post('http://localhost:4000/send-email', {
      email: 'rvruanvin@gmail.com',
      reportType: 'Relatório de Vendas'
    });

    console.log('Resposta do servidor:', response.data);
  } catch (error) {
    console.error('Erro ao enviar relatório:', error.message);
  }
};

// Execute a função
enviarRelatorio();
*/