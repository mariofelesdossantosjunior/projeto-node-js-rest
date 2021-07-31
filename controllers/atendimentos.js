module.exports = app => {

  app.get('/atendimentos', (req, res) => {
    res.send('Voce está na rota de atendimentos GET')
  })

  app.post('/atendimentos', function (req, res) {

    console.log(req.body)

    res.send('POST request to the homepage')
  })

}