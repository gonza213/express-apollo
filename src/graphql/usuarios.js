const { gql } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const {existeEmail, existeRol, esAdmin} = require('../helpers/valida-db');
const { validarJWT } = require("../middlewares/validar-token");

const typeDefsUsers = gql`
  type Usuario {
    id: ID
    username: String
    email: String
  }

 extend type Query {
    getUsuarios: [Usuario],
    getUsuario(id: ID): Usuario
  }

  input UsuarioInput{
    username: String
    email: String
    password: String
    rol: String
  }

  type Mutation {
    postUsuario(usuario: UsuarioInput): Usuario
  }
`;


const resolversUsers = {
    Query: {
      getUsuarios: async (_, args, context) => {
        //validar usuario
       const auth = await validarJWT(context);
        // validar si es ADMIN_ROLE
       const admin = esAdmin(auth.rol)
        //
        const usuarios = await Usuario.findAll();
        return usuarios;
      },
      getUsuario: async (_, args) => {
        const usuario = await Usuario.findByPk(args.id);
        return usuario;
      },
    },
    Mutation: {
      postUsuario: async (_, args) => {
        const { username, email, password, rol} = args.usuario;
        //Si existe email
        await existeEmail(email)
        //Si existe el rol
        await existeRol(rol);
        //
        const usuario = new Usuario({ username, email, password, rol});
  
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
  
        await usuario.save();
  
        return usuario;
      },
    },
  };



module.exports = {
  typeDefsUsers,
  resolversUsers
};
