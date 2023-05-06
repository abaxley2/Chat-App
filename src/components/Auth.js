import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

// Create a new instance of the Cookies library
const cookies = new Cookies();

export const Auth = (props) => {
  // Get the setIsAuth function from props
  const { setIsAuth } = props;

  // Define a function for signing in with Google
  const signInWithGoogle = async () => {
    try {
      // Use Firebase's signInWithPopup function to sign in with a Google account
      const result = await signInWithPopup(auth, provider);
      // Set a cookie with the user's refresh token
      cookies.set("auth-token", result.user.refreshToken);
      // Call setIsAuth to update the authentication state of the app
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Render the authentication UI
  return (
    <div className="auth">
      <p>Sign In With Google To Continue Please</p>
      {/* Button that triggers the signInWithGoogle function */}
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
