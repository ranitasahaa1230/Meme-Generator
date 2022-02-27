import React, { useState, useEffect } from "react";
// import memesData from "./memeData.js";

export default function Form() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  // const [allMemeImages, setAllMemeImages] = useState(memesData);
  const [allMemeImages, setAllMemeImages] = useState([]);

  // const [memeImage, setMemeImage]=useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  const handlerClick = () => {
    // const memesArr=allMemeImages.data.memes;
    const randomNum = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNum].url; //memesArr[randomNum]=>obj
    // const {url}=memesArr[randomNum]//obj destructure
    setMeme((prev) => ({
      ...prev,
      randomImage: url
    }));
  };

  function handlerInput(event) {
    const { name, value } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form-input"
          name="topText"
          value={meme.topText}
          onChange={handlerInput}
        />

        <input
          type="text"
          placeholder="Bottom text"
          className="form-input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handlerInput}
        />

        <button className="btn" onClick={handlerClick}>
          Get a new image
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="image-display" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
