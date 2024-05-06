import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../configs/api";
import { numberWithCommas } from "../components/TableItem";
import { CryptoState } from "../contexts/CryptoContext";
import CoinInfo from "../components/CoinInfo";

interface Coin {
      name: string;
      description: { en: string };
      image: { large: string };
      market_cap_rank: number;
      market_data: {
            current_price: { [key: string]: number };
            market_cap: { [key: string]: number };
      };
      id: string;
      symbol: string;
      current_price: number;
      price_change_percentage_24h: number;
      market_cap: number;
}

const CoinPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const [coin, setCoin] = useState<Coin | null>(null);
      const { currency, symbol } = CryptoState();

      const fetchCoin = async () => {
            try {
                  const { data } = await axios.get<Coin>(SingleCoin(id!));
                  setCoin(data);
            } catch (error) {
                  console.error("Error fetching coin:", error);
            }
      };

      useEffect(() => {
            fetchCoin();
      }, []);

      if (!coin) {
            return (
                  <div className="flex flex-col items-center justify-center h-screen">
                        <div className="w-full h-16 bg-gray-300 rounded"></div>
                        <div className="w-1/2 h-12 bg-gray-300 rounded mt-4"></div>
                        <div className="w-1/2 h-12 bg-gray-300 rounded mt-4"></div>
                        <div className="w-1/3 h-12 bg-gray-300 rounded mt-4"></div>
                        <div className="w-1/2 h-12 bg-gray-300 rounded mt-4"></div>
                  </div>
            );
      }

      return (
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center mt-8 h-screen">
                  <div className="md:w-1/3 p-8 border-r border-gray-300 flex flex-col justify-center">
                        <img
                              src={coin?.image.large}
                              alt={coin?.name}
                              className="mx-auto mb-4 shadow-2xl p-4 rounded-lg"
                              style={{ maxWidth: "200px" }}
                        />
                        <div className="text-center">
                              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                    {coin?.name}
                              </h1>
                              <p className="text-lg font-medium text-gray-600 leading-relaxed">
                                    {coin?.description.en.split(". ")[0] + "."}
                              </p>
                        </div>
                        <div className="mt-8 self-center w-full md:w-3/4">
                              <div className="flex items-center justify-center w-full md:max-w-xl px-4 py-2 border rounded-lg">
                                    <p className="text-sm font-bold text-gray-600">Rank</p>
                                    <p className="text-sm font-medium text-gray-600 ml-1">
                                          {numberWithCommas(coin?.market_cap_rank)}
                                    </p>
                              </div>
                              <div className="flex items-center justify-center w-full md:max-w-xl px-4 py-2 border rounded-lg mt-4">
                                    <p className="text-sm font-bold text-gray-600">Current Price</p>
                                    <p className="text-sm font-medium text-gray-600 ml-1">
                                          {symbol}{" "}
                                          {numberWithCommas(
                                                coin?.market_data.current_price[
                                                      currency.toLowerCase()
                                                ]
                                          )}
                                    </p>
                              </div>
                              <div className="flex items-center justify-center w-full md:max-w-xl px-4 py-2 border rounded-lg mt-4 -ml-1">
                                    <p className="text-sm uppercase font-bold text-gray-600 mr-1">
                                          Market Cap
                                    </p>
                                    <p className="text-sm uppercase font-bold text-gray-600">
                                          {symbol}
                                          <span className="text-lg font-bold">
                                                {numberWithCommas(
                                                      parseInt(
                                                            coin?.market_data.market_cap[
                                                                  currency.toLowerCase()
                                                            ]
                                                                  .toString()
                                                                  .slice(0, -6)
                                                      ) as number
                                                )}
                                          </span>
                                          <span className="ml-1">M</span>
                                    </p>
                              </div>
                        </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                        <CoinInfo coin={coin} />
                  </div>
            </div>
      );
};

export default CoinPage;
