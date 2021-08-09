const conexao = require("../infraestrutura/conexao");
const moment = require("moment");
class Atendimento {
  buscar(res) {
    var sql = `SELECT * FROM Atendimentos`;

    conexao.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result.rows);
      }
    });
  }

  buscarPorId(id, res) {
    var sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

    conexao.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result.rows[0]);
      }
    });
  }

  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const nomeEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: nomeEhValido,
        mensagem: "O nome do cliente deve ter pelo menos 5 caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);

    const existErros = erros.length;

    if (existErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      const sql = `INSERT INTO atendimentos(
            cliente, 
            pet, 
            servico, 
            status, 
            observacoes,
            data, 
            data_criacao) 
            VALUES($1, $2, $3, $4, $5, $6, $7)`;

      conexao.query(
        sql,
        [
          atendimentoDatado.cliente,
          atendimentoDatado.pet,
          atendimentoDatado.servico,
          atendimentoDatado.status,
          atendimentoDatado.observacoes,
          atendimentoDatado.data,
          atendimentoDatado.dataCriacao,
        ],
        (erro, resultado) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            res.status(201).json(resultado);
          }
        }
      );
    }
  }

  alterar(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY HH:mm:ss").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    const sql = `UPDATE Atendimentos SET 
    cliente = $1, 
    pet = $2, 
    servico = $3,
    status = $4,
    observacoes = $5,
    data = $6 
    WHERE id = $7`;

    const valoresFinal = [
      valores.cliente,
      valores.pet,
      valores.servico,
      valores.status,
      valores.observacoes,
      valores.data,
      id,
    ];

    conexao.query(sql, valoresFinal, (error, response) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  }

  deletar(id, res) {
    const sql = "DELETE from Atendimentos where id = $1";
    conexao.query(sql, [id], (error, response) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(response.rowCount);
      }
    });
  }
}

module.exports = new Atendimento();
