import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-600 ">
        <p>
          ABOUT <span className="text-gray-800 font-medium"> US </span>
        </p>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-14 ">

        <img className="w-full md:max-w-[390px] " src={assets.about_image} alt="" />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-md text-gray-700 ">
          <p>
            Welcome to Med Matrix, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Med Matrix, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Med Matrix is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Med Matrix is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Med Matrix is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>

      </div>

      <div className="text-xl my-9">
        <p>WHY <span className="text-gray-800 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-60">
        <div className="border border-gray-300 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className="border border-gray-300 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className="border border-gray-300 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-5 text-[18px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
