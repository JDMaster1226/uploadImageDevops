import React, { useRef, useState } from 'react';
import { ServerAPI } from '../services/serverApi';

export function Home() {
  const [srcImage, setSrcImage] = useState('');
  const [boolErr, setBoolErr] = useState(false);

  const [srcPredic, setSrcPredic] = useState('');
  const [resultImg, setResultImg] = useState('');
  const [load, setLoad] = useState(false);

  const imageUpload = useRef();
  const typeAccepted = /png|jpg|jpeg/;
  const server = 'http://localhost:5000/images/'

  const clear = ()=>{
    setSrcImage('');
    setBoolErr(false);
    setSrcPredic('');
    setResultImg('');
    setLoad(false);
  }
  const handleUpload = async () => {
    const image = imageUpload.current.files[0];

    if (image && typeAccepted.test(image.type)) {
      clear();
      var formData = new FormData();
      formData.append("image", image);
      const { data } = await ServerAPI.uploadImage(formData);
      const { filename, filePath } = data;
      setSrcImage(filename);
      ServerAPI.processImg({ rutaImagen: filePath, nombre:filename }).then(dt => {
        const { data: { image } } = dt;
        setLoad(true);
        setResultImg(image);
        setSrcPredic("pr"+filename);
      });
    } else {
      setBoolErr(true);
    }
  }

  return (
    <>
      <h1>HELLO WORDO</h1>
      {boolErr && <h4>ERROR</h4>}
      <input ref={imageUpload} type="file" name="image" />
      <button onClick={handleUpload}>Cargar</button>
      {srcImage && <a href={server + srcImage} target="_blank"><img src={server + srcImage} width="300" /></a>}
      {srcImage && (load ? <a href={server + srcPredic} target="_blank"><img src={server + srcPredic} width="300" /></a> : <h4>Cargando...esto puede tardar unos minutos.</h4>)}
      <h4>{resultImg}</h4>
    </>
  );
}