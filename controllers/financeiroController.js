
// executar também o arquivo index.js
const { Financeiro, Categoria } = require("../models")
//const usuario = require("../models/usuario")

// método para ser chamado pelo GET
exports.listar = async (req, res) => {

    const usuarioIdRecuperado = req.usuarioId
    try{
        const registros = await Financeiro.findAll({
            where: {
                usuarioId: usuarioIdRecuperado
            },
            include: [
                {
                    model: Categoria,
                    attributes: ['id', 'nome', 'descricao']
                }
            ]
        })
        res.json(registros)

    }catch (problema){
        res.status(500).json({ erro: "Não foi possível listar os registros" + problema})
    }
}

// método para ser chamado pelo POST
exports.criar = async (req, res) => {

    const usuarioIdRecuperado = req.usuarioId
    try{
        // Montar o objeto que sera criado no banco.
        const dados = {
            ...req.body,
            usuarioId: usuarioIdRecuperado
        }

        const registro = await Financeiro.create(dados)
        res.status(201).json(registro)
    } catch (listaDeErros) {
        if (listaDeErros.name === 'SequelizeValidationError'){
            return res.status(400).json({
                inconsistencias: listaDeErros.errors.map(e => e.message)
            })
        }
        res.status(500).json({erro: "Erro ao criar o registro: " + listaDeErros})
    }
}

// método para ser chamado pelo PUT
exports.alterar = async (req, res) => {
    const { id } = req.params
    try{
        const [ atualizado ] = await Financeiro.update(req.body, {
            where: { id }
        })
        if (atualizado) {
            res.status(200).json({sucesso: "Registro atualizado "})
        }else{
            res.status(404).json({sucesso: "Registro não encontrado "})
        }

    } catch (listaDeErros) {
        if (listaDeErros.name === 'SequelizeValidationError'){
            return res.status(400).json({
                inconsistencias: listaDeErros.errors.map(e => e.message)
            })
        }
        res.status(500).json({erro: "Erro ao atualizar o registro: " + listaDeErros})
    }
}

// método para ser chamado pelo DELETE
exports.remover = async (req, res) => {
    const { id } = req.params
    try{
        const deletado = await Financeiro.destroy({
            where: { id }
        })
        if (deletado) {
            res.status(200).json({sucesso: "Registro apagado com sucesso "})
        }else{
            res.status(404).json({sucesso: "Registro não encontrado "})
        }

    } catch (listaDeErros) {
        if (listaDeErros.name === 'SequelizeValidationError'){
            return res.status(400).json({
                inconsistencias: listaDeErros.errors.map(e => e.message)
            })
        }
        res.status(500).json({erro: "Erro ao atualizar o registro: " + listaDeErros})
    }
}