import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from "../redux/slices/currentUserSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/signIn', data);
            toast.success("Login successful");
            localStorage.setItem('user', JSON.stringify(response.data.userName));
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            localStorage.setItem('email', JSON.stringify(response.data.userEmail));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('avatar', JSON.stringify(response.data.avatar));
            dispatch(addUser(response.data));
            navigate("/");
        } catch (err) {
            console.error("Error in the login page: ", err);
            toast.error(err.response?.data?.error || "Invalid credentials. Please try again.");
        }
    };

    // rehydrate the store if refreshed
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));
        const avatar = JSON.parse(localStorage.getItem('avatar'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email, avatar: avatar }));
        }
    }, []);

    return (
        <>
            <div className="px-24">
                <div className="flex justify-start items-center ml-16 mt-8">
                    <Link to={'/'}>
                        <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                    </Link>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <div className="bg-white rounded-lg shadow-md p-8 w-full h-full max-w-md lg:ml-24">
                        <h1 className="text-4xl text-center text-gray-800 mb-8">Login</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <div className="text-center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="mt-4 w-full"
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="text-md text-center">
                                Don't have an account?
                                <Link to='/register' className="text-blue-500 ml-1">Sign up</Link> instead.
                            </div>
                        </form>
                    </div>
                    <div className="hidden mr-24 ml-8 lg:block">
                        <img src="https://img.freepik.com/free-vector/fingerprint-concept-illustration_114360-3898.jpg?t=st=1711706201~exp=1711709801~hmac=d1a460a58b7b85a5b134ee63b916975454ba37171fc4e7e891b5bc42577e44a4&w=740" alt="login image" className="h-full w-full" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;