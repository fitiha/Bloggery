
const StartNav = () => {
    return (
        <nav className="bg-gray-900 text-white p-4 relative z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Getting Started</div>
                <div className="flex space-x-4">
                    <a href="#how-it-works" className="hover:text-gray-200 transition duration-300 ease-in-out">How It Works</a>
                    <a href="#about-us" className="hover:text-gray-200 transition duration-300 ease-in-out">About Us</a>
                    <a href="#testimonials" className="hover:text-gray-200 transition duration-300 ease-in-out">Testimonials</a>
                    <a href="#developer" className="hover:text-gray-200 transition duration-300 ease-in-out">Developer</a>
                </div>
            </div>
        </nav>
    );
};

export default StartNav;
