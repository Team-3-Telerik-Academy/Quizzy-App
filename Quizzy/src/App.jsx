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
import HomeWhenLoggedIn from "./Views/HomeWhenLoggedIn/HomeWhenLoggedIn";
import NotFound from "./Views/NotFound/NotFound";
import UserProfile from "./Views/UserProfile/UserProfile";
import MyQuizzes from "./Views/MyQuizzes/MyQuizzes";
import ResultDetails from "./Views/ResultDetails/ResultDetails";

function App() {
  const [user, loading, error] = useAuthState(auth);
  // const [appState, setAppState] = useState({
  //   user: null,
  //   userData: null,
  // });
  const [userCredentials, setUserCredentials] = useState(null);
  const [userData, setUserData] = useState(null);

  if (userCredentials !== user) {
    setUserCredentials(user);
  }

  // finally retrieve user data if the user is logged (this is also broken and will be fixed in a bit)
  useEffect(() => {
    if (user === null) return;

    getUserData("uid", user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }

        setUserData(snapshot.val()[Object.keys(snapshot.val())[0]]);
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <AppContext.Provider
      value={{ userCredentials, setUserCredentials, userData, setUserData }}
    >
      <Toaster />
      <BrowserRouter>
        {loading && <Loading />}
        {!user && <Header />}
        <Routes>
          {!user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route
              path="/"
              element={
                <LoggedInMain>
                  <HomeWhenLoggedIn />
                </LoggedInMain>
              }
            />
          )}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/createQuiz"
            element={
              <LoggedInMain>
                <CreateQuiz />
              </LoggedInMain>
            }
          />
          <Route
            path="/profile"
            element={
              <LoggedInMain>
                <UserProfile />
              </LoggedInMain>
            }
          />
          <Route
            path="/myQuizzes"
            element={
              <LoggedInMain>
                <MyQuizzes />
              </LoggedInMain>
            }
          />
          {/* <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/liveBattle" element={<LiveBattle />} /> */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/publicQuizzes" element={<PublicQuizzes />} />
          {/* takeQuiz/:id for path to be universal */}
          <Route path="/publicQuizzes/:id" element={<PublicQuizView />} />
          <Route path="/resultDetails" element={<ResultDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
