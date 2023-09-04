import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase.config";
import { useEffect, useState } from "react";

export default function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");

  const collectionRef = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  console.log(messages);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!newMessage) return;

    const message = {
      text: newMessage,
      createdAt: serverTimestamp(),
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      room: room,
    };

    await addDoc(collectionRef, message);

    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-12">
      <h1 className="text-4xl font-semibold">{room} room</h1>
      <div className="border-2 border-gray-200 flex flex-col p-4 rounded-md w-1/2 h-1/2 overflow-auto">
        {messages.map((item, index) => (
          <div className="flex items-center gap-x-3" key={index}>
            <h1 className="font-bold">{item.name}</h1>
            {item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          className="border-2 py-2 px-4 rounded-md outline-blue-700 mr-2"
          placeholder="Type your message"
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md active:translate-y-[4px] transition-all duration-300"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
