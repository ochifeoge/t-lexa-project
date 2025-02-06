import React from "react";

import ProfileCard from "../components/ProfileCard";

const About = () => {
  return (
    <section>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center max-container gap-8 lg:gap-3">
        <div className="w-full lg:max-w-[50%]">
          <h2 className="font-bold text-4xl lg:text-6xl break-words mb-2">
            Why We Created T-lexa's World
          </h2>
          <p className="text-lg">
            In today's world, online shopping can sometimes feel like a gamble.
            At T-lexa's World, we understand the importance of trust and
            transparency in every transaction. Our e-commerce platform was built
            to prevent scams and ensure peace of mind for our customers by
            integrating secure and reliable payment methods, such as Stripe.
            With Stripe’s secure payment processing, you can use your Nigerian
            debit card or international cards to make seamless purchases,
            knowing that your financial data is protected. Our goal is to
            provide you with a safe and effortless shopping experience that you
            can trust every time.
          </p>
        </div>
        <div className="w-full rounded-md lg:max-w-[45%]  lg:rounded-3xl overflow-hidden">
          <img
            className="object-cover w-full"
            src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="online security"
          />
        </div>
      </div>

      <h1 className="mt-5 text-center text-7xl ">Meet The Owner</h1>
      <ProfileCard />
    </section>
  );
};

export default About;
