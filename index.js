const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const tabelas = require('./infraestrutura/tabelas')
const port = 3000

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('banco de dados conectado com sucesso!')

        tabelas.init(conexao)

        const app = customExpress()

        app.listen(port, () => console.log(`Servidor rodando na porta: ` + port))
    }
})