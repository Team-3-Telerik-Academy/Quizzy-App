import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Views/SignUp/SignUp";
import SignIn from "./Views/SignUp/SignIn/SignIn";

function App() {
  return (
    <>
      <Header />
      {/* <SignUp /> */}
      <SignIn />
    </>
  );
}

export default App;
