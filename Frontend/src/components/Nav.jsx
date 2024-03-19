import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import isObjectEmpty from '../functions/isObjectEmpty.';

const NavBar = () => {

    const currentUser = useSelector((state) => state.currentUser.value)
    // console.log(currentUser)
    return (
        <div className="h-16 mb-8 bg-gray-950 text-gray-200 grid grid-cols-3 text-xl ">
            <Link to='/' className='m-4'>
                <h1 className="text-3xl font-['Charm'] font-light hover:text-orange-700">The Blogger Field </h1>
            </Link>
            <Link to='/create' className='mt-3 justify-self-end hover:text-orange-700'>
                <h1>Create-Blog</h1>
            </Link>
            <Link to={isObjectEmpty(currentUser) ? '/login' : '/profile'} className='justify-self-end mt-3 mr-6 hover:text-orange-700'>
                <div>{isObjectEmpty(currentUser) ? "Login" : (<div className='mb-4'>
                    <AccountCircleIcon />
                    <p className='text-sm'>{currentUser.userName}</p>
                </div>)}</div>
            </Link>
        </div>
    )
}

export default NavBar;