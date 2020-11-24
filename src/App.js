import "./App.scss";
import Header from "./containers/Header/Header";
import Login from "./containers/Login/Login";
import Background from "./pictures/background.png";

function App() {
  return (
    <div className="app">
      <Header />
      <Login />
      <img src={Background} className="app__background" alt="Background" />
    </div>
  );
}

export default App;
