const { gql } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const typeDefsAuth = gql`
  type Usuario {
    id: ID
    email: String
  }

  type Auth {
    usuario: Usuario
    token: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Mutation {
    login(usuario: LoginInput): Auth
  }
`;

const resolversAuth = {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args.usuario;
      const usuario = await Usuario.findOne({
        where: { email },
        raw: true,
      });

      //Si existe usuario
      if (!usuario) {
        throw new Error("Usuario y/o contraseña son incorrectas.");
      }

      //Si usuario esta activo
      if (!usuario.estado) {
        throw new Error("Usuario y/o contraseña son incorrectas.");
      }

      //Si las contraseñas coinciden
      const validPass = bcrypt.compareSync(password, usuario.password);
      if (!validPass) {
        throw new Error("Usuario y/o contraseña son incorrectas.");
      }

      const token = await generarJWT(usuario.id);

      return {
        usuario,
        token,
      };
    },
  },
};

module.exports = {
  typeDefsAuth,
  resolversAuth,
};
