import { auth, provider } from "../utils/firebase.config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Auth({ setIsAuth }) {
  const handleSignInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      cookies.set("whyfooAuth-token", user.refreshToken);
      setIsAuth(true)
    } catch (error) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
      <p className="text-2xl font-semibold">Sign in with Google to continue</p>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-md active:translate-y-1"
        onClick={handleSignInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
}
