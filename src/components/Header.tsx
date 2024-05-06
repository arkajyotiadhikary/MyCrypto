// import { useHistory } from "react-router-dom";
import { CryptoState } from "../contexts/CryptoContext";

const Header = () => {
      const { currency, setCurrency } = CryptoState();

      return (
            <header className="flex flex-col w-full bg-gray-800 shadow-md">
                  <div className="container mx-auto px-4 md:px-6">
                        <div className="toolbar flex items-center justify-between min-h-16 md:min-h-20 lg:min-h-24 text-white">
                              <div className="flex items-center space-x-2">
                                    <svg
                                          className="w-6 h-6 text-yellow-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                    >
                                          <path d="M10.29 3.86L1.78 18.875 1 17.125 3.32 14.8 10.29 8l7.21-5.61L18.72 1.875z" />
                                    </svg>
                                    <div className="text-2xl font-bold tracking-wide">
                                          My Crypto
                                    </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                    <div className="relative inline-flex">
                                          <select
                                                className="w-20 h-10 text-white bg-gray-700 rounded-md px-3 cursor-pointer appearance-none font-normal leading-normal tracking-wide"
                                                onChange={(e) => setCurrency(e.target.value)}
                                                value={currency}
                                          >
                                                <option value="USD">USD</option>
                                                <option value="INR">INR</option>
                                          </select>
                                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                <svg
                                                      className="fill-current h-4 w-4"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                >
                                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                          </div>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                          Log In
                                    </button>
                              </div>
                        </div>
                  </div>
            </header>
      );
};

export default Header;
