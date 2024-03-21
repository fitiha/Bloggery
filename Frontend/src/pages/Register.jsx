import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../redux/slices/currentUserSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import isObjectEmpty from '../functions/isObjectEmpty.';

const Register = () => {
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.value)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value }); //as a key-value pair
    };

    // if the user refreshes the page fetch the data from the local storage and add it to the store
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email }));
        }
        if (!isObjectEmpty(currentUser)) {
            navigate('/create');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/api/user/signup', data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data.userName));
                    localStorage.setItem('userId', JSON.stringify(response.data.userId));
                    localStorage.setItem('email', JSON.stringify(response.data.userEmail));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    dispatch(addUser(response.data));
                    navigate('/');
                    setErrorMessage('');
                } else if (response.status === 400) {
                    setErrorMessage(response.data.message);
                } else {
                    setErrorMessage('Something went wrong');
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage(err.response.data);
            });
    }

    return (<>
        <Link to={'/'} >
            <ArrowBackIcon className="ml-16 h-8 w-8 hover:bg-sky-800 hover:text-gray-200 rounded-full" />
        </Link>
        <div className="flex justify-center m-16">
            <div className="flex flex-col bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950 justify-evenly text-orange-300 rounded-3xl h-3/4 w-82 p-8">
                <h1 className="text-4xl mb-8">Sign Up</h1>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <span>Name</span> <br />
                    <input
                        className="text-black px-2 mb-2 rounded-lg"
                        autoComplete='off'
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <br />
                    <span>Email</span> <br />
                    <input
                        className="text-black px-2 mb-2 rounded-lg"
                        autoComplete='off'
                        type="email"
                        name="email"
                        onChange={handleChange}
                    /> <br />

                    <span>Password</span> <br />
                    <input
                        className="text-black px-2 mb-8 rounded-lg"
                        autoComplete='off'
                        type="password"
                        name="password"
                        onChange={handleChange}
                    /> <br />
                    <span>Already have an account?
                        <Link to='/login'>
                            <br />
                            <span className="text-green-500 hover:underline"> Sign in</span>
                        </Link>
                        <span>  instead</span>
                    </span> <br />

                    <button
                        type='submit'
                        className="bg-emerald-700 text-gray-100 h-8 w-24 mt-4 rounded-full hover:bg-emerald-800"
                    > Submit</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default Register;