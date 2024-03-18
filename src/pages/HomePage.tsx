import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className=" bg-black h-screen  flex relative">
      {/* This Div show in small Screen Only */}
      <div className="block md:hidden h-64 w-full absolute">
        <div className=" flex justify-end mt-12 right-16 relative">
          <Link
            to="/login"
            className=" cursor-pointer font-medium text-xl text-zinc-50 200 hover:text-slate-50  "
          >
            Login
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#7A5AF9",
            borderRadius: "50%",
            filter: "blur(280px)",
          }}
          className="h-[60%]"
        ></div>

        <div className="w-full text-3xl flex justify-center items-center  mt-[-100px]  gap-[20px]">
          <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
            &#x1F60D;
          </span>
          <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
            &#x1F92D;
          </span>
          <span className="bg-opacity-20 bg-slate-300 p-4 rounded-full">
            &#129392;
          </span>
        </div>
      </div>

      <div className="flex-col ">
        <div className="flex justify-between items-center">
          <div className="logo flex items-center">
            <h1 className="text-white text-2xl font-bold my-12 ml-16">CONVO</h1>
          </div>
        </div>
        <div className="flex items-center text-white">
          <div className=" mx-16 sm:none  my-24 text-center sm:text-left flex-col">
            <h1 className="sm:text-4xl font-semibold text-3xl">
              Where Every Message <br />
              Finds Its Perfect Moment
            </h1>
            <p className=" my-6 text-sm sm:text-lg">
              Welcome to our vibrant chat platform, where every keystroke
              carries the potential <br /> to forge meaningful connections.
              Whether you're reaching out to friends, family,
              <br /> or new acquaintances, our intuitive interface and seamless
              experience make it <br /> effortless to express yourself and
              engage with others.
            </p>
            <Link
              to="/signup"
              className="bg-purple-700 text-white font-medium  rounded px-16 py-2   hover:bg-purple-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-col sm:block hidden">
        <div className=" flex justify-end mt-10 left-44 relative">
          <Link
            to="/login"
            className=" cursor-pointer font-medium text-xl text-zinc-50 200 hover:text-slate-50  "
          >
            Login
          </Link>
        </div>
        <div
          style={{
            width: "30%",
            height: "30%",
            backgroundColor: "#7A5AF9",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-45%, -45%)",
            filter: "blur(100px)",
            opacity: "0.7",
          }}
        ></div>

        <div className="justify-center items-center flex ">
          <div className=" relative left-36 ">
            <div>
              <img
                className="bg-cover bg-center w-52 h-52 rounded-full my-48 ml-4 -mx-48 -mb-10"
                src="public\images\positive-girl-with-curly-hair-standing-smiling.jpg"
                alt=""
              />
              <div className="top-20">
                <span className="bg-opacity-20 bg-slate-300 p-2 -mr-10  mx-2 my-5 rounded-full text-3xl text-gray-800 ">
                  &#x1F4AC;
                </span>
              </div>
              <div className=" bg-purple-700 font-medium rounded-2xl px-4 py-2">
                <h6>Should we have dinner tonight?</h6>
              </div>
            </div>
          </div>
          {/* ////////////////////////////////////////////////////// */}
          <div className=" relative left-14 bottom-20">
            <div>
              <img
                className="bg-cover bg-center w-64 h-64 rounded-full my-48 ml-1 -mx-35 -mb-10"
                src="/images/ali-kazal-2Td750NkgmY-unsplash.jpg"
                alt=""
              />
              <div className="">
                <span className="bg-opacity-20 bg-slate-300 p-3 ml-56 rounded-full text-3xl text-yellow-500 ">
                  &#x1F604;
                </span>
              </div>

              <div className=" bg-green-300 text-black font-medium rounded-full text-center ml-2 mr-10 mb-8 mx-16 py-2   ">
                <h6>Sure, I 'll pick you up at 7 pm</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
