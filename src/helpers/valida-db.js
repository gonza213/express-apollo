const Usuario = require("../models/usuario");
const Role = require("../models/role");

//USUARIOS
const existeEmail = async (email = "") => {
  const emailExiste = await Usuario.findOne({
    where: { email },
  });

  if (emailExiste) {
    throw new Error(`El email ${email} ya ha sido registrado.`);
  }
};

const esAdmin = (rol = "") => {
  if (rol !== "ADMIN_ROLE") {
    throw new Error(`Usuario no autorizado.`);
  }
};

//ROLES
const obtenerRoles = async () => {
  let roles = [];
  const rol = await Role.findAll();
  rol.map((role) => roles.push(role.rol));
  return roles;
};

const existeRol = async (rol = "") => {
  const roles = await obtenerRoles();
  if (!roles.includes(rol)) {
    throw new Error(`El rol ${rol} no pertenece a la BD.`);
  }
};

module.exports = {
  existeEmail,
  existeRol,
  esAdmin,
};
