import React, { useRef, useState } from 'react';
import { ServerAPI } from '../services/serverApi';

export function Home() {
  const [srcImage, setSrcImage] = useState('');
  const [boolErr, setBoolErr] = useState(false);
  const imageUpload = useRef();
  const typeAccepted = /png|jpg|jpeg/;
  const server = 'http://localhost:5000/images/'

  const handleUpload = async () => {
    const image = imageUpload.current.files[0];

    if (image && typeAccepted.test(image.type)) {
      setBoolErr(false);
      var formData = new FormData();
      formData.append("image", image);
      const { data } = await ServerAPI.uploadImage(formData);
      const { filename } = data;
      console.log(data);
      setSrcImage(filename);
    } else {
      setBoolErr(true);
    }
  }

  return (
    <>
      <h1>HELLO WORDO</h1>
      <h3>{boolErr?"ERROR":""}</h3>
      <input ref={imageUpload} type="file" name="image" />
      <button onClick={handleUpload}>Cargar</button>
      <img src={server + srcImage} />
    </>
  );
}