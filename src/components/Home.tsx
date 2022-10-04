const Home = () => {
  return (
    <div className="App">
      <div className="h-screen pt-64 md:pt-48 sm:px-16 bg-gradient-to-r from-teal-400 to-blue-500">
        <div className="text-center sm:text-left">
          <h2 className="text-7xl font-extrabold text-white sm:text-6xl md:text-8xl ">
            voting site
          </h2>

          <p className="text-xl pt-10 max-w-md text-white/90 md:text-2xl md:leading-relaxed md:block">
            気になることを匿名でアンケートし、<br></br>
            匿名で投票できるサイト
          </p>
          <div className="pt-16">
            <a
              href="/search"
              className="inline-flex items-center px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:bg-teal-600 hover:bg-gray-800"
            >
              <span className="text-sm font-medium"> 始める </span>

              <svg
                className="w-5 h-5 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
