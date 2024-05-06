import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../configs/api";
import { chartDays } from "../configs/data";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../contexts/CryptoContext";
import SelectButton from "./SelectButton";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-moment";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

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

const CoinInfo: React.FC<{ coin: Coin }> = ({ coin }) => {
      const [historicData, setHistoricData] = useState<any[]>([]);
      const [days, setDays] = useState<number>(1);
      const { currency } = CryptoState();
      const [flag, setFlag] = useState<boolean>(false);

      useEffect(() => {
            const fetchHistoricData = async () => {
                  try {
                        const {
                              data: { prices },
                        } = await axios.get<{ prices: any[] }>(
                              HistoricalChart(coin.id, days, currency)
                        );
                        setFlag(true);
                        setHistoricData(prices.map((price: any) => [price[0], price[1]]));
                  } catch (error) {
                        console.error("Error fetching historic data:", error);
                  }
            };

            fetchHistoricData();

            // Cleanup function
            return () => {
                  setHistoricData([]);
                  setFlag(false);
            };
      }, [coin, days, currency]);

      return (
            <div className="w-full flex flex-col items-center justify-center mt-8">
                  {!historicData.length || !flag ? (
                        <div className="flex flex-col items-center">
                              <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-4" />
                              <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-4" />
                              <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-4" />
                              <div className="w-1/6 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-4" />
                              <div className="w-1/8 h-4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
                        </div>
                  ) : (
                        <>
                              <Line
                                    data={{
                                          labels: historicData.map((coin) => {
                                                const date = new Date(coin[0]);
                                                return days === 1
                                                      ? date.toLocaleTimeString([], {
                                                              hour: "numeric",
                                                              minute: "numeric",
                                                        })
                                                      : date.toLocaleDateString();
                                          }),
                                          datasets: [
                                                {
                                                      data: historicData.map((coin) => coin[1]),
                                                      label: `Price ( Past ${days} Days ) in ${currency}`,
                                                      borderColor: "#444",
                                                      backgroundColor: "#444",
                                                      borderWidth: 2,
                                                      tension: 0.3,
                                                      pointBorderColor: "#444",
                                                      pointBackgroundColor: "#444",
                                                      pointBorderWidth: 4,
                                                      pointHoverRadius: 8,
                                                      pointHoverBorderWidth: 4,
                                                      pointRadius: 2,
                                                },
                                          ],
                                    }}
                                    options={{
                                          responsive: true,
                                          maintainAspectRatio: true,
                                          scales: {
                                                x: {
                                                      grid: {
                                                            display: false,
                                                            color: "#444",
                                                      },
                                                },
                                                y: {
                                                      grid: {
                                                            display: false,
                                                            color: "#444",
                                                      },
                                                },
                                          },
                                          plugins: {
                                                legend: {
                                                      display: false,
                                                },
                                          },
                                    }}
                                    style={{
                                          width: "100%",
                                          height: "100%",
                                    }}
                              />
                        </>
                  )}
                  <div className="flex mt-4">
                        {chartDays.map((day) => (
                              <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                          setDays(day.value);
                                          setFlag(false);
                                    }}
                                    selected={day.value === days}
                              >
                                    {day.label}
                              </SelectButton>
                        ))}
                  </div>
            </div>
      );
};

export default CoinInfo;
