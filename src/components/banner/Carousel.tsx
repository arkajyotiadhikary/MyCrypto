import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { cryptoData } from "../../data/coinsData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrendingCoins } from "../../configs/api";
import { CryptoState } from "../../contexts/CryptoContext";
import { numberWithCommas } from "../TableItem";

const Carousel: React.FC = () => {
      const [trending, setTrending] = useState<any[]>([...cryptoData]);
      const { currency, symbol } = CryptoState();

      const fetchTrendingCoins = async () => {
            try {
                  const { data } = await axios.get<any[]>(TrendingCoins(currency));
                  if (data) setTrending(data);
            } catch (error) {
                  console.error("Error fetching trending coins:", error);
            }
      };

      useEffect(() => {
            fetchTrendingCoins();
      }, [currency]);

      const items = trending.map((coin) => {
            const profit = coin?.price_change_percentage_24h >= 0;

            return (
                  <Link
                        key={coin.id}
                        to={`/coins/${coin.id}`}
                        className="flex flex-col items-center cursor-pointer text-white"
                  >
                        <img src={coin?.image} alt={coin.name} className="h-20 mb-2 mx-2" />
                        <span className=" text-slate-400">
                              {coin?.symbol}&nbsp;
                              <span
                                    className={`font-bold ${
                                          profit ? "text-green-500" : "text-red-500"
                                    }`}
                              >
                                    {profit && "+"}
                                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                              </span>
                        </span>
                        <span className="text-lg font-bold text-black">
                              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                        </span>
                  </Link>
            );
      });

      const responsive = {
            0: {
                  items: 2,
            },
            512: {
                  items: 4,
            },
      };

      return (
            <div className="w-full">
                  <AliceCarousel
                        mouseTracking
                        infinite
                        autoPlayInterval={1000}
                        animationDuration={1500}
                        disableDotsControls
                        disableButtonsControls
                        responsive={responsive}
                        items={items}
                        autoPlay
                  />
            </div>
      );
};

export default Carousel;
