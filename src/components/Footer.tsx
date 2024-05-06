import { useNavigate } from "react-router-dom";

const Footer = () => {
      const navigator = useNavigate();
      return (
            <footer className="bg-white shadow dark:bg-gray-900">
                  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                              <div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    onClick={() => navigator("/")}
                              >
                                    <svg
                                          className="w-6 h-6 text-yellow-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                    >
                                          <path d="M10.29 3.86L1.78 18.875 1 17.125 3.32 14.8 10.29 8l7.21-5.61L18.72 1.875z" />
                                    </svg>
                                    <div className="text-2xl font-bold tracking-wide text-white">
                                          My Crypto
                                    </div>
                              </div>

                              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                    <li>
                                          <a href="#" className="hover:underline me-4 md:me-6">
                                                About
                                          </a>
                                    </li>
                                    <li>
                                          <a href="#" className="hover:underline me-4 md:me-6">
                                                Privacy Policy
                                          </a>
                                    </li>
                                    <li>
                                          <a href="#" className="hover:underline me-4 md:me-6">
                                                Licensing
                                          </a>
                                    </li>
                                    <li>
                                          <a href="#" className="hover:underline">
                                                Contact
                                          </a>
                                    </li>
                              </ul>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                              © 2022{" "}
                              <a href="https://flowbite.com/" className="hover:underline">
                                    My Crypto™
                              </a>
                              . All Rights Reserved.
                        </span>
                  </div>
            </footer>
      );
};

export default Footer;
