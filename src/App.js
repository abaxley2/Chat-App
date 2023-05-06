import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  // Set up state variables for authentication, chat room, and room input ref
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  // Define a function for signing out the current user
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  // Render the app UI
  if (!isAuth) {
    // If the user is not authenticated, render the Auth component
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  // If the user is authenticated, render the Chat UI (if a room is selected) or the room selection UI (if no room is selected)
  return (
    <>
      {room ? (
        <div>
          <Chat room={room} />
        </div>
      ) : (
        <div className="room">
          {/* Input field for selecting a chat room */}
          <label>Enter Room</label>
          <input ref={roomInputRef} />
          {/* Button for entering a chat room */}
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
      {/* Button for signing out the current user */}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
