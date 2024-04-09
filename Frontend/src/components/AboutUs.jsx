
const AboutUs = () => {
    return (
        <section id="about-us" className="py-12 text-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-5xl lg:text-8xl font-bold">About Us</h2>
                    <p className="text-xl mt-4">Diving deep into the world of blogging</p>
                </div>

                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="h-full p-8 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                            <p>To empower writers and creators by providing them with a platform to share their unique stories and insights, connecting them with a global audience.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="h-full p-8 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">What We Do</h3>
                            <p>We offer a diverse range of topics and a supportive community for bloggers to thrive, learn, and grow together.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="h-full p-8 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Join Us</h3>
                            <p>Whether you're a seasoned blogger or just starting, we invite you to join our platform and start making an impact with your writing today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
