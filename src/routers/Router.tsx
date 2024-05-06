import { BrowserRouter as Router } from "react-router-dom";
import AppStack from "../stacks/AppStack";
import CryptoContext from "../contexts/CryptoContext";

const Routers = () => {
      return (
            <Router>
                  <CryptoContext>
                        <AppStack />
                  </CryptoContext>
            </Router>
      );
};

export default Routers;
