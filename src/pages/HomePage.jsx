import Hero from "../sections/Hero";
import Products from "../components/Products";
import Service from "../sections/Service";
import TestimonialCards from "../sections/Testimonial";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Products isHome={true} label="New Arrivals" />
      <TestimonialCards />
      <Service />
    </>
  );
};

export default HomePage;
