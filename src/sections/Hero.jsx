import { heroVid } from "../components/details";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  useGSAP(() => {
    gsap.from(".hero-heading", { opacity: 0, y: 20, duration: 1.5 });
    gsap.from(".hero-text", { opacity: 0, y: 20, duration: 1.5, delay: 0.5 });
    gsap.from(".hero-btn", { opacity: 0, y: 20, duration: 1.5, delay: 1 });
  }, []);
  return (
    <section className="  hero relative p-0  min-h-[70dvh] overflow-hidden lg:max-h-dvh flex flex-col gap-5 items-start justify-center ">
      <video autoPlay muted loop className=" hidden xl:block h-full w-full">
        <source src={heroVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=" hidden xl:flex flex-col gap-10  absolute left-20 top-2/4 -translate-y-1/2    ">
        <h3 className="hero-heading lg:text-8xl  font-bold ">
          Discover <span className="text-red-500">New</span> <br /> Horizons
        </h3>
        <p className="text-xl hero-text">
          Stay ahead with the latest styles and innovations <br />
          that define modern living. Find your next must-have items.
        </p>
        <span className="hero-btn">
          <button
            className={` bg-red-500  flex justify-center items-center gap-2 px-7 py-4 border leading-none rounded-full text-white border-red-600 group hover:bg-red-600 transition`}>
            Shop Now
          </button>
        </span>
      </div>

      <div className="xl:hidden ms-7 h-full flex flex-col gap-5 items-start justify-center">
        <h3 className="hero-heading font-bold text-6xl md:text-8xl">
          Discover <span className="text-red-500">New</span> Horizons
        </h3>
        <p className="hero-text text-slate-900 leading-5 font-medium text-xl">
          Stay ahead with the latest styles and innovations <br /> that define
          modern living. Find your next must-have items.
        </p>
        <span className="hero-btn">
          <button
            className={` bg-red-500  flex justify-center items-center gap-2 px-7 py-4 border leading-none rounded-full text-white border-red-600 group hover:bg-red-600 transition`}>
            Shop Now
          </button>
        </span>
      </div>
    </section>
  );
};

export default Hero;
