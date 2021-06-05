const { exec } = require('child_process');
const path = require('path');
const rutaImages=path.join(__dirname, '../images/upload');

function yolo(rutaArchivo,nombre) {
  //./darknet detect cfg/yolov3.cfg yolov3.weights ${rutaArchivo} > .pipe
  const cmd = `cd darknet && ./darknet detect cfg/yolov3.cfg yolov3.weights ${rutaArchivo} > .pipe && mv predictions.jpg ${rutaImages}/pr${nombre} && cat .pipe`;
  return new Promise((resolve, reject) => {
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
