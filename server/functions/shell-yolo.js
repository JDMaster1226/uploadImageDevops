const { exec } = require('child_process');

function yolo(rutaArchivo,nombreImage){
    const cmd = `pwd && ls && echo ${rutaArchivo}${nombreImage}`;
    console.log(`##########: 1- CMD ${cmd}`);
    return new Promise((resolve, reject)=>{
      try {
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            // some err occurred
            const errString = JSON.stringify(err.toString());
            const regExp = new RegExp('already exists');
            const exists = regExp.test(errString);
            if (exists) {
              resolve(exists);
            } else {
              reject(err);
            }
          } else {
            resolve(stdout);
          }
        });
      } catch (e) {
        reject(e);
      }
    })
  }

  module.exports = { yolo };
