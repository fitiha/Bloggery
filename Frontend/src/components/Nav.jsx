import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import isObjectEmpty from '../functions/isObjectEmpty.';
import { Avatar } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const NavBar = () => {
    const location = useLocation();
    const currentUser = useSelector((state) => state.currentUser.value);
    return (<>
        {location.pathname != '/' && (

            <nav className="flex items-center justify-between h-16 lg:px-24 px-4 bg-zinc-950 text-white">
                <Link to='/home' className='hover:text-orange-700 flex '>
                    <img src='https://www.svgrepo.com/show/54787/bebo.svg' alt="logo" className='h-12 w-12 bg-white mt-1 hover:bg-orange-700' />
                    {location.pathname == '/home' ? <h1 className="text-4xl hidden lg:block md:block font-['Cinzel'] font-light mt-3">loggery.</h1> : null}
                </Link>
                {
                    location.pathname != '/' ?
                        <div className="flex items-center space-x-4">
                            <Link to='/create' className='hover:text-orange-700'>
                                <AddRoundedIcon />
                                <span >Create Blog</span>
                            </Link>
                            <Link to={isObjectEmpty(currentUser) ? '/login' : '/profile'} className='flex items-center hover:text-orange-700'>
                                {isObjectEmpty(currentUser) ? (
                                    <>
                                        <LoginRoundedIcon />
                                        <span>Login</span>
                                    </>
                                ) : (
                                    <>
                                        {/* <Avatar src={`http://localhost:5000/uploads/${currentUser.avatar}`} alt="avatar" sx={{ width: 30, height: 30 }} /> */}
                                        <Avatar src={`https://bloggery-a3xc.onrender.com/uploads/${currentUser.avatar}`} alt="avatar" sx={{ width: 30, height: 30 }} />
                                        <span className='ml-1 mb-1 text-sm capitalize font-bold'>{currentUser.userName}</span>
                                    </>
                                )}
                            </Link>

                        </div>
                        : null
                }
            </nav>
        )

        }
    </>
    );
};

export default NavBar;
