import axios from 'axios';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../redux/slices/currentUserSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value }); //as a key-value pair
    };

    const handleSubmit = async () => {
        await axios.post('http://localhost:5000/api/user/signup', data)
            .then((response) => {
                console.log("successful registration of ", response.data);
                dispatch(addUser(response.data));
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (<>
        <Link to={'/'} >
            <ArrowBackIcon className="ml-16 h-8 w-8 hover:bg-sky-800 hover:text-gray-200 rounded-full" />
        </Link>
        <div className="flex justify-center m-16">
            <div className="flex flex-col bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950 justify-evenly text-orange-300 rounded-3xl h-3/4 w-82 p-8">
                <h1 className="text-4xl mb-8">Sign Up</h1>
                <form action="submit">
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
                    <Link to='/'>
                        <button
                            onClick={handleSubmit}
                            className="bg-emerald-700 text-gray-100 h-8 w-24 mt-4 rounded-full hover:bg-emerald-800"
                        > Submit</button>
                    </Link>


                </form>
            </div>
        </div>
    </>
    )
}

export default Register;