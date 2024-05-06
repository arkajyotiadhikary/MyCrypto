import { CryptoState } from "../contexts/CryptoContext";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x: number) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface TableItemProps {
      row: {
            id: string;
            name: string;
            symbol: string;
            current_price: number;
            price_change_percentage_24h: number;
            image: string;
            market_cap: number;
      };
}

const TableItem: React.FC<TableItemProps> = ({ row }) => {
      const navigator = useNavigate();
      const { symbol } = CryptoState();
      return (
            <tr
                  onClick={() => navigator(`/coins/${row.id}`)}
                  key={row.id}
                  className="hover:bg-gray-100 py-14 cursor-pointer transition-colors duration-300 "
            >
                  <td className="px-8 py-4 flex items-center text-lg">
                        <img
                              src={row.image}
                              alt={row.name}
                              className="h-16 w-16 p-2 mr-6 mt-1 shadow-lg"
                        />
                        <div className="flex flex-col text-left">
                              <span className="font-semibold text-gray-800">{row.symbol}</span>
                              <span className="text-gray-500 text-base">{row.name}</span>
                        </div>
                  </td>
                  <td className="px-6 py-4 text-right text-lg">
                        <span className="font-semibold text-gray-800">
                              {numberWithCommas(parseInt(row.current_price.toFixed(2)))}
                        </span>
                        <span className="text-gray-800"> {symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-lg pr-4">
                        <span
                              className={
                                    row.price_change_percentage_24h >= 0
                                          ? "text-green-500"
                                          : "text-red-500"
                              }
                              style={{
                                    fontVariantNumeric: "tabular-nums",
                              }}
                        >
                              {row.price_change_percentage_24h >= 0 ? "+" : ""}
                              {row.price_change_percentage_24h.toFixed(2)}%
                        </span>
                  </td>
                  <td className="px-8 py-4 text-right text-lg font-semibold">
                        <span className="text-gray-500 pr-2">{symbol}</span>
                        <span className="text-gray-900">
                              {numberWithCommas(parseInt((row.market_cap / 1000000).toFixed(2)))}
                        </span>
                        <span className="text-gray-500"> M</span>
                  </td>
            </tr>
      );
};

export default TableItem;
