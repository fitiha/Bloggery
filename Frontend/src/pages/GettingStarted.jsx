import { Link } from 'react-router-dom';
import StartNav from '../components/StartNav';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';

const GettingStarted = () => {
    return (<>
        <StartNav />
        <div className="min-h-svh min-h-full text-gray-700 flex justify-center pb-32 items-center">
            <div className="absolute inset-0 w-full h-full">
                <img src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?w=740" alt="Blogging Community" className="w-fit h-fit mt-16 object-cover opacity-50" />
            </div>

            <div className="relative z-10 font-['Georgia'] flex flex-col justify-center items-center space-y-4 px-4 pr-8 text-gray-950">
                <div className='flex'>
                    <img src="https://www.svgrepo.com/show/54787/bebo.svg" alt="Bebo Logo" className='h-20 w-20 lg:h-36 lg:w-36 bg-orange-700' />
                    <p className="text-6xl lg:text-7xl lg:text-9xl text-orange-700  pt-3">loggery.</p>
                </div>
                <div className='flex flex-col justify-center items-center space-y-4'>
                    <h1 className="lg:text-5xl text-4xl font-bold text-center">Connect, Create, Share</h1>
                    <p className="text-xl text-center">Join the vibrant <span className='text-orange-800'>Bloggery</span> community and bring your stories to life.</p>
                    <Link to="/register" className="bg-gray-800 text-white px-9 py-5 rounded-lg font-['Cinzel'] font-medium text-lg lg:text-2xl hover:bg-orange-800 transition-colors">Create Your First Post</Link>

                </div>
            </div>
        </div>
        <hr />

        <div id='how-it-works' className="flex flex-col items-center my-8 p-4 bg-gray-100">
            <h1 className="text-5xl lg:text-8xl font-bold text-gray-900 font-['Georgia']">How it works</h1><br />
            <iframe
                className="w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/2 h-64 md:h-96 m-8"
                src="https://www.youtube.com/embed/kyjpj1RrsyI"
                title="Bloggery guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            <p ><span className='text-orange-700'>Vid:</span> A YouTube video that shows a demonstration on how to use Bloggery. </p>
        </div>
        <hr />
        <AboutUs />
        <Testimonials />
        <div className='flex flex-col items-center justify-center m-4 p-8' id='developer'>
            <h1 className="text-5xl lg:text-8xl font-bold text-orange-700 font-['Georgia']">Meet the developer</h1><br />
            <div className='flex justify-center items-center gap-3 flex-wrap'>
                <div className='flex gap-2 items-center'>
                    <img src="https://media.licdn.com/dms/image/D4E03AQEn7XI25b17oA/profile-displayphoto-shrink_800_800/0/1702796714494?e=1718236800&v=beta&t=MOUVFTbbK57bQBuCRpNVSkdjRt2R_fUmsnxn1C9Y75I" alt="" className='h-36 w-36 rounded-full' />
                    <div className="flex flex-col font-['Roboto']">
                        <p className='float-right text-xl  font-bold'>Natnael Fisseha (Natty🐟)</p>
                        <p className='float-right text-xl'>fitihanegest1995@gmail.com</p>
                        <p className='float-right text-xl'>+2519 05 687 433</p>
                    </div>
                </div>
                <div className=' text-xl'>
                    <div className='flex flex-wrap gap-3'>
                        {/* <LinkedInIcon /> */}
                        <Link to={"https://www.linkedin.com/in/natnael-fisseha/"}>
                            <img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299455.jpg?t=st=1712669377~exp=1712672977~hmac=7e6bef564eb245e18b9e5fe5b3d7d7c7ba87aa0f15d2dbe5bab92fafb19c8698&w=740" alt="Linkedin" className='h-16 w-16 hover:text-orange-800' />
                        </Link>
                        <Link to={"https://x.com/DuSuka38718?t=5qTDgEKYdF0ppBwkhPKV0g&s=09"}>
                            <img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299461.jpg?t=st=1712669543~exp=1712673143~hmac=f5f2567aad37285b2e7b64578968f81b2e7925f4d397e8dab09b9bd1e0f3f7eb&w=740" alt="x-twitter" className='h-16 w-16' />
                        </Link>
                        <Link to={"https://www.instagram.com/edilfish/"}>
                            <img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299465.jpg?t=st=1712669562~exp=1712673162~hmac=13c06d64bb949ad75645597edf60e500bf3dc4b626d3aafafc22de523dea508e&w=740" alt="instagram" className='h-16 w-16' />
                        </Link>
                        <Link to={"https://www.youtube.com/channel/UCKNjLJdAKaKfDC9oife47kg"}>
                            <img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299457.jpg?t=st=1712669595~exp=1712673195~hmac=4f3b024d4a4ad75d1cfed9915c9397fe1969e4ca6e3fc3f80eb9e53e49548893&w=740" alt="youtube" className='h-16 w-16' />
                        </Link>
                        <Link to={""}>
                            <img src="https://img.freepik.com/premium-psd/social-media-logo-design_23-2151299453.jpg?w=740" alt="whatsapp" className='h-16 w-16' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>);
};

export default GettingStarted;
