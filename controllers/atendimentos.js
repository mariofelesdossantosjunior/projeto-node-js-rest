const Atendimento = require('../models/atendimento')

module.exports = app => {

  app.get('/atendimentos', (req, res) => {
    Atendimento.buscar(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const { id } = req.params;
    Atendimento.buscarPorId(id, res)
  })

  app.post('/atendimentos', function (req, res) {
    const atendimento = req.body
    Atendimento.adiciona(atendimento, res)
  })

}