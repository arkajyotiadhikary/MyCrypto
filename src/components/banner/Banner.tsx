import { FunctionComponent } from "react";
import Carousel from "./Carousel";

interface BannerProps {}

const Banner: FunctionComponent<BannerProps> = () => {
      return (
            <div className="banner h-screen bg-cover bg-center bg-no-repeat p-8">
                  <div className="container mx-auto px-4 md:px-6 bannerContent flex flex-col justify-around h-full">
                        <div className="tagline flex flex-col justify-center text-center">
                              <h2 className="text-9xl font-black drop-shadow-2xl pb-10 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-blue-500">
                                    <span className="skew-y-12">M</span>y
                                    <br />
                                    <span className="skew-y-12">C</span>rypto
                              </h2>
                              <p className="text-base sm:text-xl mt-4 sm:tracking-wide font-light leading-relaxed text-gray-400 italic">
                                    A stylish cryptocurrency price tracker with detailed information
                                    on over <span className="font-bold">1000+</span>{" "}
                                    cryptocurrencies.
                              </p>
                        </div>
                        <div className="carousel flex items-center mt-8">
                              <Carousel />
                        </div>
                  </div>
            </div>
      );
};

export default Banner;
