import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Views/SignUp/SignUp";
import SignIn from "./Views/SignUp/SignIn/SignIn";
import { useState } from "react";
import AppContext from "./Context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [appState, setAppState] = useState({
    user,
    userData: null,
  });

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
  // return (
  //   <>
  //     <Header />
  //     {/* <SignUp /> */}
  //     <SignIn />
  //   </>
  // );
}

export default App;
