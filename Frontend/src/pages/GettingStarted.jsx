
import { Link } from 'react-router-dom';

const GettingStarted = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-700">
            <div className="">
                <img src="https://cdn.pixabay.com/photo/2020/02/22/17/53/communication-4871245_1280.jpg" alt="Blogging Community" className="w-full h-screen" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center space-y-4">
                    <h1 className="text-4xl font-bold text-white px-4 text-center">Connect, Create, Share</h1>
                    <p className="text-xl text-white px-4 text-center">Join the vibrant Bloggery community and bring your stories to life.</p>
                    <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors">Get Started Now</Link>
                </div>
            </div>
        </div>
    );
};

export default GettingStarted;
