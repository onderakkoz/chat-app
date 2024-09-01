import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Messages from "../components/messages";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState();
  const lastMsg = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();

    //mesajin eklenecegi collection'in referansini aliyoruz
    const messagesCol = collection(db, "messages");

    // collection'a dokuman ekleme
    await addDoc(messagesCol, {
      room,
      text: e.target[0].value,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

     // son mesaja kaydir
    lastMsg.current.scrollIntoView({behavior: "smooth"})


    // formu sifirlama
    e.target.reset();
  };

  console.log(lastMsg);

  // mevcut odada gonderilen mesajlari anlik olarak almak icin
  useEffect(() => {
    // abone olunacak collection'in referansini aliyoruz
    const messagesCol = collection(db, "messages");

    // sorgu ayarlarini yapmak icin
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //onSnapshot ile anlik olarak collectiondaki degisiklikleri izler
    //collection her degistiginde verdigimiz fonksiyon ile collectiondaki guncel belgeleri aliriz.
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs[0].data());

      let tempMsg = [];

      // dokumanlarin icindeki veriye eris ve gecici diziye aktar
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));
      console.log(tempMsg);

          //state'i guncelle
      setMessages(tempMsg);
    });
  }, []);

  console.log(auth);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {" "}
        {!messages ? (
          <p>Sohpete ilk mesajı gönderin</p>
        ) : (
          messages.map((data, i) => <Messages data={data} key={i} />)
        )}

        <div ref={lastMsg}/>
      </main>

      <div className="out">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Mesajınızı yazınız..." required />
          <button>Gönder</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;