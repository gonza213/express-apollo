const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario')

const validarJWT = async (req = response) => {
  const token = req.header("x-token");

  if(!token){
    throw new Error("No existe token en la peticion");
  }

  const uid = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

  const usuario = await Usuario.findOne({
    where: {id: uid.uid},
    raw: true
  })

  if(!usuario){
    throw new Error("El usuario no esta autorizado.");
  }

 return usuario
  
};

module.exports = {
  validarJWT,
};
