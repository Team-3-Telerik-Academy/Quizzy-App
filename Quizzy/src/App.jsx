import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Views/SignUp/SignUp";
import { useEffect, useRef, useState } from "react";
import AppContext from "./Context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Views/SignIn/SignIn";
import Home from "./Views/Home/Home";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  changeUserStatus,
  getUserData,
  listenForUserChanges,
} from "./services/users.service";
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
import GroupDetails from "./Views/GroupDetails/GroupDetails";
import Authenticated from "./Components/hoc/Authenticated/Authenticated";
import AuthenticatedAdmin from "./Components/hoc/AuthenticatedAdmin/AuthenticatedAdmin";
import AuthenticatedEducator from "./Components/hoc/AuthenticatedEducator/AuthenticatedEducator";
import LiveBattleMain from "./Views/LiveBattleMain/LiveBattleMain";

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

  const userDataRef = useRef();

  useEffect(() => {
    if (
      userData &&
      JSON.stringify(userData) !== JSON.stringify(userDataRef.current)
    ) {
      userDataRef.current = userData;
      listenForUserChanges(userData.username, setUserData);
      changeUserStatus(userData);
    }
  }, [userData]);

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
        {!loading && !user && <Header />}
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
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/publicQuizzes" element={<PublicQuizzes />} />
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

          {/* for educators only */}
          <Route
            path="/createQuiz"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <CreateQuiz />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/myQuizzes"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <MyQuizzes />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/editQuiz/:id"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <EditQuiz />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/quizStatistics/:statisticsId"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <SingleStatisticsView />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/singleQuizStatistics/viewDetails"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <br />
                  <ViewDetailsSingleQuizStatistics />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/createGroup"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <CreateGroup />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/educatorGroups"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <EducatorGroups />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/groupDetails/:groupId"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <GroupDetails />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />
          <Route
            path="/CreateSuccess/:value"
            element={
              <AuthenticatedEducator>
                <LoggedInMain>
                  <CreateSuccessView />
                </LoggedInMain>
              </AuthenticatedEducator>
            }
          />

          {/* for logged in users */}
          <Route
            path="/quizzes"
            element={
              <Authenticated>
                <LoggedInMain>
                  <QuizzesView />
                </LoggedInMain>
              </Authenticated>
            }
          />

          <Route
            path="/live-battle"
            element={
              <Authenticated>
                <LoggedInMain>
                  <LiveBattleMain />
                </LoggedInMain>
              </Authenticated>
            }
          />

          <Route
            path="/takenQuizzes"
            element={
              <Authenticated>
                <LoggedInMain>
                  <TakenQuizzes />
                </LoggedInMain>
              </Authenticated>
            }
          />
          <Route
            path="/takenQuizzes/details"
            element={
              <Authenticated>
                <LoggedInMain>
                  <br />
                  <TakenQuizViewDetails />
                </LoggedInMain>
              </Authenticated>
            }
          />
          <Route
            path="/scoreboard"
            element={
              <Authenticated>
                <LoggedInMain>
                  <Scoreboard />
                </LoggedInMain>
              </Authenticated>
            }
          />
          <Route
            path="/Friends"
            element={
              <Authenticated>
                <LoggedInMain>
                  <Friends />
                </LoggedInMain>
              </Authenticated>
            }
          />
          <Route
            path="/Messenger"
            element={
              <Authenticated>
                <LoggedInMain>
                  <Messenger />
                </LoggedInMain>
              </Authenticated>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Authenticated>
                <LoggedInMain>
                  <UserProfile />
                </LoggedInMain>
              </Authenticated>
            }
          />

          {/* for admins only */}
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route
            path="/adminHome"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <AdminHome />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          <Route
            path="/adminUsers"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <AdminUsers />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          <Route
            path="/blockedUsers"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <BlockedUsers />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          <Route
            path="/adminQuizzes/:type"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <AdminQuizzes />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          <Route
            path="/adminEducators"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <AdminEducators />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          <Route
            path="/adminStudents"
            element={
              <AuthenticatedAdmin>
                <AdminMain>
                  <AdminStudents />
                </AdminMain>
              </AuthenticatedAdmin>
            }
          />
          {/* 
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/liveBattle" element={<LiveBattle />} /> */}
          {/* takeQuiz/:id for path to be universal */}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
