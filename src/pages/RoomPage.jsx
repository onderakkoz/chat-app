import React from 'react'

const RoomPage = ({setIsAuth, setRoom}) => {
    // cikis yap butonuna tiklaninca
    const logout =()=>{
        //yetkiyi false'a cek 
        setIsAuth(false)
        //local'i temizle sayfa yenilendiginde tekrar ayni yerde kalmamak icin 
        localStorage.removeItem("token")

    }

    //form gonderilince
    const handleSubmit =(e)=>{
        e.preventDefault()

        const room = e.target[0].value.trim().toLowerCase()
        console.log(room)

        setRoom(room)

    }


  return (
    <form onSubmit={handleSubmit} className='room-page'>
      <h1>Chat Odası</h1>

      <p>Hangi Odaya Giriceksiniz ?</p>
      <input type="text" placeholder='örn:haftaiçi' />

      <button type='submit'>Odaya Gir</button>
      <button onClick={logout} type='button' >Çıkış Yap</button>
    </form>
  )
}

export default RoomPage;