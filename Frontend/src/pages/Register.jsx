import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../redux/slices/currentUserSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import isObjectEmpty from '../functions/isObjectEmpty.';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';

const Register = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.value)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!isObjectEmpty(currentUser)) {
            navigate('/create');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.password !== data.password2) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post('https://bloggery-a3xc.onrender.com/api/user/signup', {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            if (response.status === 200) {
                toast.success("Registered successfully");
                dispatch(addUser(response.data));
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data || "An error occurred during registration.");
        }
    };


    return (
        <>
            <div className="flex justify-start items-center ml-4 lg:ml-16 mt-8">
                <Link to={'/home'}>
                    <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                </Link>
            </div>
            <div className="flex justify-center items-center mt-8 mb-4 gap-20">
                <div className='hidden ml-28 lg:block'>
                    <img src="https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5453.jpg?w=1060&t=st=1711704850~exp=1711705450~hmac=570d7877a380bc282a51e92dfd40c2197ae967c9a1e124f33ac59fd467d7c0a4" alt="register" className="w-full h-full" />
                </div>
                <div className="bg-gray-100 rounded-lg shadow-md p-8 lg:mr-44 w-full max-w-md">
                    <h1 className="text-4xl text-center text-gray-800 mb-8">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="password2"
                            type="password"
                            variant="outlined"
                            onChange={handleChange}
                            required
                        />
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-gray-800 w-full h-12 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-orange-800 transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="text-md text-center">
                            Already have an account?
                            <Link to='/login' className="text-orange-700 hover:underline ml-1">Sign in</Link> instead.
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
