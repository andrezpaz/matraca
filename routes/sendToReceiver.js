var express = require('express');
var router = express.Router();
var axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { requester, msg } = req.body;

    // Verificação de dados
    if (!requester || !msg) {
      return res.status(400).send('Requester and message are required.');
    }

    const response = await axios.post('http://localhost:3000/api/v1/posts', {
      requester,
      msg,
      checked: false
    });

    //res.redirect(`/requester/${requester}`);
    res.status(201).json({ message: 'Message sent successfully', data: response.data });
  } catch (error) {
    console.error(error);
    // Enviar uma resposta de erro ao cliente
    res.status(500).send('An error occurred while processing your request.');
  }
});

module.exports = router;
