import CoinsTable from "../components/CoinsTable";
import Header from "../components/Header";
import Banner from "../components/banner/Banner";
import CryptoContext from "../contexts/CryptoContext";

const HomePage = () => {
      return (
            <>
                  <Banner />
                  <CoinsTable />
            </>
      );
};

export default HomePage;
