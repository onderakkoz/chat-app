import React from "react";
import { auth } from "../firebase";

const Messages = ({ data }) => {

  // eger mesaji oturum sahibi attiysa ekrana mesaj icerigi basilacak
  if (auth.currentUser?.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  //farkli bir kullanici atti ise ekrana foto isim msj basilacak
  return (
    <div className="msg-other">
      <div className="user-info">
      <img src={data.author.photo} alt="profil pic" />
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
     
    </div>
  );
};

export default Messages;