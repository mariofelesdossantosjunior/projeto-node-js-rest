const Atendimento = require('../models/atendimento')

module.exports = app => {

  app.get('/atendimentos', (req, res) => {
    res.send('Voce está na rota de atendimentos GET')
  })

  app.post('/atendimentos', function (req, res) {
    const atendimento = req.body
    Atendimento.adiciona(atendimento)
    res.send('POST atendimento')
  })

}