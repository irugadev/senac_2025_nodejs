const { Categoria } = require("../models")
const usuario = require("../models/categoria")

exports.listar = async (req, res) => {
    const categoria = await Categoria.findAll()
    res.json(categoria)
}
exports.criar = async (req, res) => {
    const categoria = await Categoria.create(req.body)
    res.status(201).json(categoria)
}

