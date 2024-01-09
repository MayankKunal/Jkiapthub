import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLine from "../components/core/HomePage/TimeLine";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between  max-w-maxContent">
        <Link to={"/signUp"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-gray-800 font-bold text-gray-300 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-gray-900">
              <p>Become an Instructor</p> <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className="text-center w-[90%] text-lg mt-4 flex ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </div>

        <div className="flex flex-row gap-7 mt-8 text-center ">
          <CTAButton active={true} linkto={"/signUp"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="shadow-blue-200 mx-3 my-9">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div>
          {/* code section1 */}
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"Coding Potential"} /> with our
                courses
              </div>
            }
            subheading={
              " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            }
            ctabn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<body>\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n</body>\n</html>\n`}
            codeColor={"text-yellow-200"}
          />

          {/* code section 2 */}

          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"Coding Potential"} /> with our
                courses
              </div>
            }
            subheading={
              " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            }
            ctabn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<body>\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n</body>\n</html>\n`}
            codeColor={"text-yellow-200"}
          />
          


        </div>

        <ExploreMore/>
        
      </div>

      {/* Section 2 */}
      <div className="bg-purple-50  text-gray-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex  items-center gap-5 mx-auto justify-center">
            <div className="flex flex-row gap-7 text-white mt-[150px] ">
              <CTAButton active={true} linkto={"signUp"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"signUp"}>
                <div className="flex items-center gap-4">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between">
          <div className="flex flex-row gap-5 mb-10 mt-10">
            <div className="text-4xl font-semibold  w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>

              <CTAButton active={true} linkto={"/signUp"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimeLine/>
          <LearningLanguage/>


        </div>
      </div>

      {/* Section 3 */}
        <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-black text-white">
        <InstructorSection/>
        <h2 className="text-center text-4xl font-semibold mt-10">reviews from other learners</h2>
        
        </div>


        {/* Section 4 */}
      <Footer/>
      
    </div>
  );
};

export default Home;
