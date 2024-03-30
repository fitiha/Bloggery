import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import isObjectEmpty from '../functions/isObjectEmpty.';

const NavBar = () => {
    const currentUser = useSelector((state) => state.currentUser.value);
    return (
        <nav className="flex items-center justify-between h-16  px-24 bg-gray-900 text-white">
            <Link to='/' className='hover:text-orange-700'>
                <h1 className="text-4xl font-['Cinzel'] font-light">Bloggery.</h1>
            </Link>
            <div className="flex items-center space-x-4">
                <Link to='/create' className='hover:text-orange-700'>
                    <h1>Create Blog</h1>
                </Link>
                <Link to={isObjectEmpty(currentUser) ? '/login' : '/profile'} className='flex items-center hover:text-orange-700'>
                    {isObjectEmpty(currentUser) ? (
                        "Login"
                    ) : (
                        <>
                            <AccountCircleIcon />
                            <span className='ml-1 text-sm'>{currentUser.userName}</span>
                        </>
                    )}
                </Link>

            </div>
        </nav>
    );
};

export default NavBar;
