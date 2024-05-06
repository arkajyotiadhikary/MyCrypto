import { Route, Routes } from "react-router-dom";
import CoinPage from "../pages/CoinPage";
import HomePage from "../pages/HomePage";

const AppStack = () => {
      return (
            <Routes>
                  <Route path="/" Component={HomePage} />
                  <Route path="/coins/:id" Component={CoinPage} />
            </Routes>
      );
};

export default AppStack;
