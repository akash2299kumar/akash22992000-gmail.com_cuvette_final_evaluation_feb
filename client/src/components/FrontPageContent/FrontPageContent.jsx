import React from "react";
import image1 from "../../assets/Group.png";
import back from "../../assets/Back.png";
import styles from "./FrontPageContent.module.css";

function FrontPageContent() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={back} alt="Background" className={styles.backImage} />
        <img src={image1} alt="Main" className={styles.mainImage} />
      </div>
      <div className={styles.text}>
        <h1 style={{color: 'white'}}>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
    </div>
  );
}

export default FrontPageContent;
