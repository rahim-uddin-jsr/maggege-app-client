// import axios from "axios";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };
  const loginWithGithub = () => {
    return signInWithPopup(auth, githubAuthProvider);
  };
  const updateUserProfile = (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo);
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      console.log(currentUser);
      if (currentUser) {
        setLoading(true);
        axios
          .post("http://localhost:5000/jwt", {
            uid: currentUser?.uid,
            userName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          })
          .then((res) => {
            console.log({ res });
            localStorage.setItem("access_token", res.data.token);
            document.cookie = "token=" + res.data.token;
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access_token");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });
    return () => unsubscribe();
  }, [auth]);
  const authInfo = {
    createUser,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
    updateUserProfile,
    user,
    logout,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
