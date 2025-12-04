
// Importa a conexão com o banco de dados
const conexaoBanco = require("../config/database")

// Importa o model financeiro
const Financeiro = require("./financeiro")(conexaoBanco)
const Usuario = require("./usuario")(conexaoBanco)
const Categoria = require("./categoria")(conexaoBanco)

Usuario.hasMany(Financeiro, { foreignKey: "usuarioId"})
Financeiro.belongsTo(Usuario, { foreignKey: "usuarioId"})

// Uma categoria pode ter muitos lançamentos financeiros
// Um lançamento financeiro esta relacionado a uma unica categoria
Categoria.hasMany(Financeiro, { foreignKey: "categoriaId"})
Financeiro.belongsTo(Categoria, { foreignKey: "categoriaId"})

module.exports = {conexaoBanco, Usuario, Financeiro, Categoria}