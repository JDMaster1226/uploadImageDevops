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
    const {nombre} =  req.params;
    const rutaArchivo = rutaImages+'/upload/'+nombre;

      if (fs.existsSync(rutaArchivo)) {
        try {
          ms.pipe(req, res, rutaArchivo);
        } catch (errMS) {
          const mensajeError = `Error al hacer stream de archivo ${rutaArchivo}: ${errMS}`;
          console.log(mensajeError);
        }
      } else {
        const mensajeError = "No existe el archivo en el sistema de archivos";
        console.log(mensajeError);
      }
});

routers.post('/', upload, (req, res) => {
    const { path,filename } = req.file;
    res.send({
        status: 0,
        message: 'post imge',
        filePath:path,
        filename,
    });
});

routers.post('/yolo',async(req,res)=>{
  const { rutaImagen,nombre } = req.body;
  const image = await yolo(rutaImagen, nombre);
  res.send({
    status: 0,
    message: 'get yolo imge',
    image
});
});


module.exports = routers;