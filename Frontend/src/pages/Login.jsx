import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser, clearState } from "../redux/slices/currentUserSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line react/prop-types
            if (props.userType == "user") {
                const response = await axios.post('http://localhost:5000/api/user/signIn', data);
                toast.success("Login successful");
                dispatch(clearState());
                dispatch(addUser(response.data));
                navigate("/home");
            }
            // eslint-disable-next-line react/prop-types
            if (props.userType == "admin") {
                console.log("handling admin login")
                const response = await axios.post('http://localhost:5000/api/user/admin/login', data);
                if (response.status == 200) {
                    toast.success("");
                    dispatch(clearState());
                    dispatch(addUser({ name: response.data.userName }));
                    console.log("admin login ", response.data.userName)
                    navigate("/admin/users");
                }
                else
                    toast.error('Invalid credentials')
            }

        } catch (err) {
            console.error("Error in the login page: ", err);
            toast.error(err.response?.data?.error || "Invalid credentials. Please try again.");
        }
    };

    return (
        <>
            <div className="px-4 lg:px-24">
                <div className="flex justify-start items-center lg:ml-16 mt-8">
                    <Link to={'/home'}>
                        <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                    </Link>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <div className="bg-gray-100 text-gray-900 rounded-lg shadow-md p-8 py-16 w-full flex-1 max-w-md lg:ml-24">
                        <h1 className="text-4xl text-center mb-8">Login</h1>

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
                                <button
                                    type="submit"

                                    color="primary"
                                    // className="mt-4 w-full"
                                    className="bg-gray-800 w-full text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-orange-800 transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                            {
                                // eslint-disable-next-line react/prop-types
                                props.userType != 'admin' && (
                                    <div className="text-md text-center">
                                        Don't have an account?
                                        <Link to='/register' className="text-orange-600 hover:underline ml-1">Sign up</Link> instead.
                                    </div>
                                )
                            }
                        </form>
                    </div>
                    {
                        // eslint-disable-next-line react/prop-types
                        props.userType == 'user' && (
                            <div className="hidden mr-24 ml-8 lg:block">
                                <img src="https://img.freepik.com/free-vector/fingerprint-concept-illustration_114360-3898.jpg?t=st=1711706201~exp=1711709801~hmac=d1a460a58b7b85a5b134ee63b916975454ba37171fc4e7e891b5bc42577e44a4&w=740" alt="login image" className="h-full w-full" />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Login;