

const Testimonials = () => {
    const testimonials = [
        { id: 1, name: "Alex Johnson", text: "This blogging platform has transformed the way I connect with my audience. Highly recommended!", img: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1712667661~exp=1712671261~hmac=c47e89357e86667356808ac2b38de99e29872d0c8fd4d95efaef05911f983f72&w=740" },
        { id: 2, name: "Maria Smith", text: "A fantastic resource for anyone looking to start their blogging journey. Easy to use and great support!", img: "https://img.freepik.com/premium-vector/person-icon-design-template-isolated-avatar-sign-vector-illustration_109161-3505.jpg?w=740" },
        { id: 3, name: "John Doe", text: "Thanks to this platform, my blog has reached audiences I never thought possible. Great features and analytics.", img: "https://img.freepik.com/free-vector/young-man-with-blue-hair_24877-82124.jpg?t=st=1712667963~exp=1712671563~hmac=64518e68e44d6b960e1dde77075f00dc835bad4cb634b9335ce403b487ef208e&w=740" },
        { id: 4, name: "Emma Wilson", text: "Incredible platform! It's user-friendly and has helped increase my blog's visibility." },
        { id: 5, name: "Chris Brown", text: "A must-use for bloggers at any level. The customization options are endless." },
    ];

    return (
        <section id='testimonials' className="bg-gray-100 py-12 font-['Georgia']">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl lg:text-8xl text-center font-bold mb-6">What People Are Saying</h2>
                <div className="flex flex-wrap gap-3 justify-center space-x-4">
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <div key={testimonial.id} className="max-w-md p-4 bg-white rounded-lg shadow">
                            <img src={testimonial.img} alt="avatar" className='h-32 w-32 rounded-full' />
                            <p className="italic">{testimonial.text}</p>
                            <p className="mt-4 font-semibold">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;