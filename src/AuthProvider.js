import React, { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import app from "./firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import { ref, set, onValue, get, child } from "firebase/database";
import { database } from "./firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, isAdmin) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (isAdmin)
      set(ref(database, "users/" + result.user.uid), {
        role: "admin",
      });
    return result;
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const snapshot = await get(
      child(ref(database), "users/" + result.user.uid)
    );
    if (snapshot.exists())
      if (snapshot.val().role === "admin")
        return {
          admin: true,
          ...result,
        };
    return { admin: false, ...result };
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("User Observing");
      console.log("Curent", currentUser);
      if (currentUser) {
        const snapshot = await get(
          child(ref(database), "users/" + currentUser.uid)
        );
        if (snapshot.exists() && snapshot.val().role === "admin") {
          setUser({
            admin: true,
            ...currentUser,
          });
        } else {
          setUser({ admin: false, ...currentUser });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    createUser,
    signInUser,
    logOutUser,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
