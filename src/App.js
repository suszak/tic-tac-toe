import "./App.scss";
import Header from "./containers/Header/Header";
import Background from "./pictures/background.png";
import StartPage from "./containers/StartPage/StartPage";

function App() {
  return (
    <div className="app">
      <Header />
      <StartPage />
      <img src={Background} className="app__background" alt="Background" />
    </div>
  );
}

export default App;
