const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid')
const path = require('path');
const fs = require("fs");
const ms = require("mediaserver");
const { yolo } = require('../functions/shell-yolo');
const routers = express.Router();

const rutaImages=path.join(__dirname, '../images');

const optionStorage = multer.diskStorage({
    destination: rutaImages+'/upload',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: optionStorage,
    dest: rutaImages+'/upload',
    fileFilter: (req, file, cb) => {
        const typeAccepted = /png|jpg|jpeg/;
        const myme = typeAccepted.test(file.mimetype);
        const ext = typeAccepted.test(path.extname(file.originalname));
        if (myme && ext) {
            return cb(null, true);
        }
        cb({
            status: 1,
            message: 'post imge',
            filePath: "n/a",
            filename: "n/a",
        });
    }
}).single('image');


routers.get('/:nombre', async (req, res) => {
    const image = await yolo('ruta', 'nombre');
    const {nombre} =  req.params;
    const rutaArchivo = rutaImages+'/upload/'+nombre;
    console.log(`${rutaArchivo} ruta audio`);
      // Verficar existencia del audio
      if (fs.existsSync(rutaArchivo)) {
        try {
          ms.pipe(req, res, rutaArchivo);
        } catch (errMS) {
          const mensajeError = `Error al hacer stream de archivo ${rutaArchivo}: ${errMS}`;
          console.log(mensajeError);
        }
      } else {
        const mensajeError = "No existe el audio en el sistema de archivos";
        console.log(mensajeError);
      }

    //console.log(image);

});

routers.post('/', upload, (req, res) => {
    console.log("router image post");
    const { path,filename } = req.file;
    console.log(req.file);
    res.send({
        status: 0,
        message: 'post imge',
        filePath:path,
        filename,
    });
});









module.exports = routers;