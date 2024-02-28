import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Views/SignUp/SignUp";
import { useEffect, useState } from "react";
import AppContext from "./Context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Views/SignIn/SignIn";
import Home from "./Views/Home/Home";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.service";
import { logoutUser } from "./services/auth.service";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  // for logout button onClick
  const onLogout = () => {
    logoutUser().then(() => {
      setAppState({
        user: null,
        userData: null,
      });
    });
  };

  if (appState.user !== user) {
    setAppState({ user });
  }

  // finally retrieve user data if the user is logged (this is also broken and will be fixed in a bit)
  useEffect(() => {
    if (user === null) return;

    getUserData("uid", user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <Toaster/>
      <BrowserRouter>
        {!appState.user ? (
          <Header />
        ) : (
          <button onClick={onLogout}>Log Out</button>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
