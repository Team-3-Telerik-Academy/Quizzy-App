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
import { Toaster } from "react-hot-toast";
import LoggedInMain from "./Components/LoggedInMain/LoggedInMain";
import Loading from "./Components/Loading/Loading";
import AboutUs from "./Views/AboutUs/AboutUs";
import PublicQuizzes from "./Views/PublicQuizzes/PublicQuizzes";
import PublicQuizView from "./Views/PublicQuizView/PublicQuizView";
import CreateQuiz from "./Views/CreateQuiz/CreateQuiz";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

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
      <Toaster />
      <BrowserRouter>
        {loading && <Loading />}
        {!user && <Header />}
        <Routes>
          {!user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<LoggedInMain><Home /></LoggedInMain>} />
          )}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/createQuiz" element={<LoggedInMain><CreateQuiz /></LoggedInMain>} />
          {/* <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myQuizzes" element={<MyQuizzes />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/liveBattle" element={<LiveBattle />} /> */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/publicQuizzes" element={<PublicQuizzes />} />
          <Route path="/publicQuizzes/:id" element={<PublicQuizView />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
