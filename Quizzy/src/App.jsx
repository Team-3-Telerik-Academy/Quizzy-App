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
import EditQuiz from "./Views/EditQuiz/EditQuiz";
import QuizzesView from "./Views/QuizzesView/QuizzesView";
import AdminPanel from "./Views/AdminPanel/AdminPanel";
import AdminMain from "./Components/AdminMain/AdminMain";
import AdminHome from "./Views/AdminHome/AdminHome";
import AdminUsers from "./Views/AdminUsers/AdminUsers";
import TakenQuizzes from "./Views/TakenQuizzes/TakenQuizzes";
import QuizResult from "./Components/QuizResult/QuizResult";
import BlockedUsers from "./Views/BlockedUsers/BlockedUsers";
import AdminEducators from "./Views/AdminEducators/AdminEducators";
import Scoreboard from "./Views/Scoreboard/Scoreboard";
import AdminStudents from "./Views/AdminStudents/AdminStudents";
import EducatorGroups from "./Views/EducatorGroups/EducatorGroups";
import CreateGroup from "./Views/CreateGroup/CreateGroup";
import CreateSuccessView from "./Views/CreateSuccessView/CreateSuccessView";
import SingleStatisticsView from "./Views/SingleStatisticsView/SingleStatisticsView";
import Friends from "./Views/Friends/Friends";
import Messenger from "./Views/Messenger/Messenger";
import AdminQuizzes from "./Views/AdminQuizzes/AdminQuizzes";
import TakenQuizViewDetails from "./Views/TakenQuizViewDetails/TakenQuizViewDetails";
import ViewDetailsSingleQuizStatistics from "./Views/ViewDetailsSingleQuizStatistics/ViewDetailsSingleQuizStatistics";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [userCredentials, setUserCredentials] = useState(null);
  const [userData, setUserData] = useState(null);
  const [chatUser, setChatUser] = useState(null);

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
      value={{
        userCredentials,
        setUserCredentials,
        userData,
        setUserData,
        chatUser,
        setChatUser,
      }}
    >
      <Toaster />
      <BrowserRouter>
        {loading && <Loading />}
        {!user && <Header />}
        <Routes>
          {!loading && !user ? (
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
            path="/profile/:username"
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
          <Route
            path="/editQuiz/:id"
            element={
              <LoggedInMain>
                <EditQuiz />
              </LoggedInMain>
            }
          />
          <Route
            path="/quizStatistics/:statisticsId"
            element={
              <LoggedInMain>
                <SingleStatisticsView />
              </LoggedInMain>
            }
          />
          <Route
            path="/quizzes"
            element={
              <LoggedInMain>
                <QuizzesView />
              </LoggedInMain>
            }
          />

          <Route
            path="/scoreboard"
            element={
              <LoggedInMain>
                <Scoreboard />
              </LoggedInMain>
            }
          />

          <Route
            path="/educatorGroups"
            element={
              <LoggedInMain>
                <EducatorGroups />
              </LoggedInMain>
            }
          />

          <Route
            path="/adminHome"
            element={
              <AdminMain>
                <AdminHome />
              </AdminMain>
            }
          />

          <Route
            path="/adminStudents"
            element={
              <AdminMain>
                <AdminStudents />
              </AdminMain>
            }
          />

          <Route
            path="/adminUsers"
            element={
              <AdminMain>
                <AdminUsers />
              </AdminMain>
            }
          />

          <Route
            path="/blockedUsers"
            element={
              <AdminMain>
                <BlockedUsers />
              </AdminMain>
            }
          />

          <Route
            path="/adminEducators"
            element={
              <AdminMain>
                <AdminEducators />
              </AdminMain>
            }
          />

          <Route
            path="/adminQuizzes/:type"
            element={
              <AdminMain>
                <AdminQuizzes />
              </AdminMain>
            }
          />

          <Route
            path="/CreateSuccess/:value"
            element={
              <LoggedInMain>
                <CreateSuccessView />
              </LoggedInMain>
            }
          />

          <Route
            path="/takenQuizzes"
            element={
              <LoggedInMain>
                <TakenQuizzes />
              </LoggedInMain>
            }
          />

          <Route
            path="/Friends"
            element={
              <LoggedInMain>
                <Friends />
              </LoggedInMain>
            }
          />

          <Route
            path="/Messenger"
            element={
              <LoggedInMain>
                <Messenger />
              </LoggedInMain>
            }
          />

          <Route
            path="/takenQuizzes/details"
            element={
              <LoggedInMain>
                <br />
                <TakenQuizViewDetails />
              </LoggedInMain>
            }
          />

          <Route
            path="/singleQuizStatistics/viewDetails"
            element={
              <LoggedInMain>
                <br />
                <ViewDetailsSingleQuizStatistics />
              </LoggedInMain>
            }
          />
          <Route
            path="/createGroup"
            element={
              <LoggedInMain>
                <CreateGroup />
              </LoggedInMain>
            }
          />
          {/* 
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/liveBattle" element={<LiveBattle />} /> */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/publicQuizzes" element={<PublicQuizzes />} />
          {/* takeQuiz/:id for path to be universal */}
          <Route path="/publicQuizzes/:id" element={<PublicQuizView />} />
          <Route
            path="/quizResult"
            element={
              !loading && !user ? (
                <QuizResult />
              ) : (
                <LoggedInMain>
                  <br />
                  <QuizResult />
                </LoggedInMain>
              )
            }
          />
          <Route
            path="/resultDetails"
            element={
              userData ? (
                <LoggedInMain>
                  <br />
                  <ResultDetails />
                </LoggedInMain>
              ) : (
                <ResultDetails />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
