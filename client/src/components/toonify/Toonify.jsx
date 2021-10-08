import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'
import { AiOutlineUpload, AiOutlineDownload } from 'react-icons/ai';
import './toonify.css';

const Toonify = () => {

  const [nImg, setNImg] = useState("https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png");

  const [downloadLink, setDownloadLink] = useState("");

  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      const userImg = await convertBase64(file);
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const { data } = await axios.post("/api/auth/toonifyimage", { userImg }, config);
      setNImg(data.output_url);
      document.getElementById('toonify-img').classList.add("res-img");
      setDownloadLink(data.output_url);
    } catch (error) {
      alert("Choose another image!");
    }

  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }

      fileReader.onerror = (err) => {
        reject(err);
      }
    })
  }

  const postUrl = async (e) => {
    e.preventDefault();
    try {
      if (!imgUrl.trim()) {
        alert("Don't leave the input field empty!");
      }
      else {
        const userImg = imgUrl.trim();
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const { data } = await axios.post("/api/auth/toonifyimage", { userImg }, config);
        setNImg(data.output_url);
        document.getElementById('toonify-img').classList.add("res-img");
        setDownloadLink(data.output_url);
        setImgUrl("");
      }
    } catch (error) {
      alert("Choose another image!");
    }
  }

  const downloadImg = () => {
    saveAs(nImg, 'toonify.jpg')
  };

  return (
    <div className="body-div">
      <div className="box-div">
        <img className="toonify-img" src={nImg} alt="" id="toonify-img" />
        {
          downloadLink
            ?
            <button onClick={downloadImg} className="download-btn">Download image <AiOutlineDownload style={{ color: "aqua", marginBottom: "-2px" }} /></button>
            :
            null
        }
      </div>
      <div className="box-div">
        <div className="img-up">
          <label className="image-upload-label" htmlFor="toonify-file" style={{ color: "aqua" }}>Choose image <AiOutlineUpload style={{ color: "aqua", marginBottom: "-2px" }} /></label>
          <input type="file" onChange={(e) => { uploadImage(e) }} style={{ border: "2px solid aqua", color: "aqua" }} className="toonify-file" id="toonify-file" />
        </div>
        <form className="paste-url" onSubmit={postUrl}>
          <input type="text" className="url-inp" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="Paste image URL" />
          <button type="submit" className="url-btn">Done</button>
        </form>
      </div>
    </div>
  )
}

export default Toonify;
