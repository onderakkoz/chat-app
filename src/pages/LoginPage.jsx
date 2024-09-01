import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = ({setIsAuth}) => {
  // buttona tıklanınca
  const handleClick = () => {
    // google ile giris yap
    signInWithPopup(auth, provider)
    // basarili olursa
      .then((res) => {setIsAuth(true)

    // locale token kaydet
    localStorage.setItem("token", res.user.refreshToken)
})

      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yap</p>

        <button onClick={handleClick}>
          <img src="./src/assets/google.webp" alt="" width={"50px"} />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;