import { auth, db } from "../firebase-config";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import "../components/Chat.css";

export const Chat = (props) => {
  // Get the room name from props
  const { room } = props;

  // Set up state variables for the new message and the messages list
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Create a reference to the "messages" collection in Firestore
  const messagesRef = collection(db, "messages");

  // Subscribe to changes in the messages collection for the current room
  useEffect(() => {
    // Create a query that filters messages by room and orders them by timestamp
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    // Set up a listener that triggers when the messages collection changes
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      // Create an array of messages from the snapshot data
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      // Set the messages state variable to the new array
      setMessages(messages);
    });
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  });

  // Handle form submission when the user sends a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    // Add a new message document to Firestore with the current user's name and room name
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    // Reset the new message state variable to an empty string
    setNewMessage("");
  };

  // Render the chat UI
  return (
    <div className="chat-app">
      <div className="header">
        {/* Display the room name in the header */}
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {/* Map over the messages array and display each message */}
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      {/* Form for entering a new message */}
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          // Update the new message state variable when the input field changes
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        {/* Button to send the new message */}
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
