import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import isObjectEmpty from '../functions/isObjectEmpty.';
import { Avatar } from '@mui/material';

const NavBar = () => {
    const location = useLocation();
    const currentUser = useSelector((state) => state.currentUser.value);
    return (<>
        <nav className="flex items-center justify-between h-16 lg:px-24 px-4 bg-gray-900 text-white">
            <Link to='/home' className='hover:text-orange-700 flex '>
                <img src='https://www.svgrepo.com/show/54787/bebo.svg' className='h-12 w-12 bg-white mt-1 hover:bg-orange-700' />
                {location.pathname == '/admin/users' ? <h1 className="text-4xl font-['Cinzel'] font-light mt-3">Admin.</h1> : null}
            </Link>
            {
                location.pathname != '/' ? <>
                    <div className="flex items-center space-x-4">
                        <Link to='/create' className='hover:text-orange-700'>
                            <h1>Create Blog</h1>
                        </Link>
                        <Link to={isObjectEmpty(currentUser) ? '/login' : '/profile'} className='flex items-center hover:text-orange-700'>
                            {isObjectEmpty(currentUser) ? (
                                "Login"
                            ) : (
                                <>
                                    {/* <Avatar src={`http://localhost:5000/uploads/${currentUser.avatar}`} sx={{ width: 30, height: 30 }} /> */}
                                    <Avatar src={`https://bloggery-a3xc.onrender.com/uploads/${currentUser.avatar}`} sx={{ width: 30, height: 30 }} />
                                    <span className='ml-1 mb-1 text-sm capitalize font-bold'>{currentUser.userName}</span>
                                </>
                            )}
                        </Link>

                    </div>
                </> : null
            }
        </nav>
    </>
    );
};

export default NavBar;
