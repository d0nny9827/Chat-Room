import { useState, useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";

const cookies = new Cookies();

export default function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("whyfooAuth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  const handleSignoutUser = async () => {
    await signOut(auth);
    cookies.remove("whyfooAuth-token");
    setIsAuth(false);
    setRoom(null);
  };

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-4 h-screen">
          <label className="text-3xl font-semibold">Enter Room Name:</label>
          <input
            type="text"
            ref={roomInputRef}
            className="border-2 border-blue-700 rounded-lg outline-none p-2"
          />
          <button
            onClick={() => setRoom(roomInputRef.current.value)}
            className="bg-blue-700 px-4 py-2 text-white font-semibold rounded-md"
          >
            Enter chat
          </button>
        </div>
      )}
      <button
        onClick={handleSignoutUser}
        className="absolute top-4 right-4 bg-red-700 text-white py-2 rounded-md px-4"
      >
        Sign out
      </button>
    </>
  );
}
