import "./App.css";
import CryptoContext from "./contexts/CryptoContext";
import Routers from "./routers/Router";

function App() {
      return (
            <CryptoContext>
                  <Routers />
            </CryptoContext>
      );
}

export default App;
