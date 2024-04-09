import { useState, useEffect } from 'react';

const Testimonials = () => {
    const testimonials = [
        { id: 1, name: "Alex Johnson", text: "This blogging platform has transformed the way I connect with my audience. Highly recommended!" },
        { id: 2, name: "Maria Smith", text: "A fantastic resource for anyone looking to start their blogging journey. Easy to use and great support!" },
        { id: 3, name: "John Doe", text: "Thanks to this platform, my blog has reached audiences I never thought possible. Great features and analytics." },
        // Additional testimonials for the carousel
        { id: 4, name: "Emma Wilson", text: "Incredible platform! It's user-friendly and has helped increase my blog's visibility." },
        { id: 5, name: "Chris Brown", text: "A must-use for bloggers at any level. The customization options are endless." },
    ];

    const [activeIndex, setActiveIndex] = useState(2); // Start with the 3rd testimonial for rotation

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => current === testimonials.length - 1 ? 2 : current + 1);
        }, 3000); // Rotate every 3 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section id='testimonials' className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-center font-bold mb-6">What People Are Saying</h2>
                <div className="flex justify-center space-x-4">
                    {testimonials.slice(0, 2).map((testimonial) => (
                        <div key={testimonial.id} className="max-w-md p-4 bg-white rounded-lg shadow">
                            <p className="italic">"{testimonial.text}"</p>
                            <p className="mt-4 font-semibold">- {testimonial.name}</p>
                        </div>
                    ))}

                    <div className="max-w-md p-4 bg-white rounded-lg shadow">
                        <p className="italic">"{testimonials[activeIndex].text}"</p>
                        <p className="mt-4 font-semibold">- {testimonials[activeIndex].name}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;