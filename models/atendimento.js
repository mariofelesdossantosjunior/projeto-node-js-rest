const conexao = require('../infraestrutura/conexao')

class Atendimento {

    adiciona(atendimento) {

        const dataCriacao = new Date()
        const atendimentoDatado = {...atendimento, dataCriacao}

        const sql = `INSERT INTO atendimentos(
            cliente, 
            pet, 
            servico, 
            status, 
            observacoes,
            data, 
            data_criacao) 
            VALUES($1, $2, $3, $4, $5, $6, $7)`

        conexao.query(sql, [
            atendimentoDatado.cliente,
            atendimentoDatado.pet,
            atendimentoDatado.servico,
            atendimentoDatado.status,
            atendimentoDatado.observacoes,
            atendimentoDatado.data,
            atendimentoDatado.dataCriacao
        ], (erro, resultado) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        })
    }

}

module.exports = new Atendimento