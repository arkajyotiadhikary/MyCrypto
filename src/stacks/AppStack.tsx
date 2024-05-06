import { Route, Routes } from "react-router-dom";
import CoinPage from "../pages/CoinPage";
import HomePage from "../pages/HomePage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppStack = () => {
      return (
            <>
                  <Header />
                  <Routes>
                        <Route path="/" Component={HomePage} />
                        <Route path="/coins/:id" Component={CoinPage} />
                  </Routes>
                  <Footer />
            </>
      );
};

export default AppStack;
