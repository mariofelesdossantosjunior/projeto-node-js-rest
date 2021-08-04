const conexao = require('../infraestrutura/conexao')
const moment = require('moment')
class Atendimento {

    adiciona(atendimento, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const atendimentoDatado = { ...atendimento, dataCriacao, data }

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
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultado)
            }
        })
    }

}

module.exports = new Atendimento