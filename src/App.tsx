import "./App.css";
import Header from "./components/Header";
import CryptoContext from "./contexts/CryptoContext";
import Routers from "./routers/Router";

function App() {
      return (
            <CryptoContext>
                  <Header />
                  <Routers />
            </CryptoContext>
      );
}

export default App;
