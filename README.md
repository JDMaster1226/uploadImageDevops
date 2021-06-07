# uploadImageDevops
Aplicacion con un frontEnd sencillo para la subida de imagenes con implementacion de YOLO, el objetibo prinicpar el la integracion con kubernetes para ello se utilizan tecnologias como dokcer y git Actions.

La app cuenta con un frontEnd y backEnd cada una dockerizada con un repositorio en https://hub.docker.com/ 

Con el git action, al subir un commit a la tama principal main se actiba unos jobs el cual checkea el codigo, la dockeriza crea un tag en docker y lo sube al repositorio de docker, depsues actualiza el deployment y el replicationControler en kubernetes.

desplegado en cloud google http://34.66.128.97:3000/
