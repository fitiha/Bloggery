
const StartNav = () => {
    return (
        <nav className="bg-gray-900 text-white px-4 relative z-20">
            <div className="container mx-auto flex justify-between items-center">
                {/* <div className="text-lg font-bold">Getting Started</div> */}
                <img src='https://www.svgrepo.com/show/54787/bebo.svg' alt="logo" className='h-12 w-12 bg-white mt-1 hover:bg-orange-700' />
                <div className="flex space-x-4 lg:text-lg text-sm">
                    <a href="#how-it-works" className="hover:text-orange-600 transition duration-300 ease-in-out">How It Works</a>
                    <a href="#about-us" className="hover:text-orange-600 transition duration-300 ease-in-out">About Us</a>
                    <a href="#testimonials" className="hover:text-orange-600 transition duration-300 ease-in-out">Testimonials</a>
                    <a href="#developer" className="hover:text-orange-600 transition duration-300 ease-in-out">Developer</a>
                </div>
            </div>
        </nav>
    );
};

export default StartNav;
