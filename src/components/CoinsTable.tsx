import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../configs/api";
import { CryptoState } from "../contexts/CryptoContext";
import Pagination from "./Pagination";
import TableItem from "./TableItem";
import { cryptoData } from "../data/coinsData";

interface Coin {
      id: string;
      name: string;
      symbol: string;
      current_price: number;
      price_change_percentage_24h: number;
      image: string;
      market_cap: number;
}

const CoinsTable: React.FC = () => {
      const [coins, setCoins] = useState<Coin[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [search, setSearch] = useState<string>("");
      const [page, setPage] = useState<number>(1);

      const { currency } = CryptoState();

      const fetchCoins = async () => {
            setLoading(true);
            try {
                  const { data } = await axios.get<Coin[]>(CoinList(currency));
                  setCoins(data);
            } catch (error) {
                  console.error("Error fetching coins:", error);
                  setCoins([...cryptoData]);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchCoins();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency]);

      const handleSearch = () => {
            return coins.filter(
                  (coin) =>
                        coin.name.toLowerCase().includes(search.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(search.toLowerCase())
            );
      };

      const handlePageChange = (pageNumber: number) => {
            setPage(pageNumber);
      };

      return (
            <div className="container mx-auto text-center">
                  <h1 className="text-4xl font-bold text-gray-700 mt-8">
                        Cryptocurrency Prices by Market Cap
                  </h1>
                  <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                        placeholder="Search For a Crypto Currency.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-200 mt-4 rounded-lg">
                              <thead className="bg-gray-800 text-white shadow-md rounded-lg">
                                    <tr className="rounded-lg">
                                          <th className="px-6 py-4 font-semibold text-lg border-b-2 border-gray-500 text-left">
                                                Coin
                                          </th>
                                          <th className="px-6 py-4 font-semibold text-lg border-b-2 border-gray-500 text-right">
                                                Price
                                          </th>
                                          <th className="px-6 py-4 font-semibold text-lg border-b-2 border-gray-500 text-right">
                                                24h Change
                                          </th>
                                          <th className="px-6 py-4 font-semibold text-lg border-b-2 border-gray-500 text-right">
                                                Market Cap
                                          </th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {loading ? (
                                          <tr>
                                                <td colSpan={4} className="py-3 text-center">
                                                      <div className="relative">
                                                            <div className="h-8 w-full bg-dark-500 rounded-full"></div>
                                                            <div
                                                                  className="h-8 w-0 bg-dark-500 rounded-full absolute top-0 left-0 transition-all duration-300"
                                                                  style={{
                                                                        width: `${
                                                                              (100 * (page - 1)) /
                                                                              coins.length
                                                                        }%`,
                                                                  }}
                                                            ></div>
                                                      </div>
                                                </td>
                                          </tr>
                                    ) : (
                                          handleSearch()
                                                .slice((page - 1) * 10, page * 10)
                                                .map((row) => <TableItem row={row} />)
                                    )}
                              </tbody>
                        </table>
                  </div>
                  <div className="m-8 mx-4">
                        <Pagination
                              currentPage={page}
                              totalPages={Math.ceil(handleSearch().length / 10)}
                              onPageChange={handlePageChange}
                        />
                  </div>
            </div>
      );
};

export default CoinsTable;
