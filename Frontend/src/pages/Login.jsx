import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from "../redux/slices/currentUserSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [data, setData] = useState({});

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value }); //key-value pairs
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/user/signIn', data)
            .then((response) => {
                toast.success("Login successful");
                localStorage.setItem('user', JSON.stringify(response.data.userName));
                localStorage.setItem('userId', JSON.stringify(response.data.userId));
                localStorage.setItem('email', JSON.stringify(response.data.userEmail));
                localStorage.setItem('token', JSON.stringify(response.data.token));

                dispatch(addUser(response.data));
                navigate("/");
            })
            .catch((err) => {
                console.log("error in the login page: ", err)
                toast.warn(err.response.data?.error || "Invalid credentials. Please try again")
            });
    }
    // if the user refreshes the page fetch the data from the local storage and add it to the store
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email }));
        }
    }, []);

    return (<>
        <Link to={'/'} >
            <ArrowBackIcon className="ml-16 h-8 w-8 hover:bg-sky-800 hover:text-gray-200 rounded-full" />
        </Link>
        <div className="flex justify-center m-16">
            <div className="flex flex-col bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950 justify-evenly text-orange-300 rounded-3xl h-96 w-64 p-8">
                <h1 className="text-4xl mb-8">Login</h1>
                <form action="submit">
                    <span>Email</span>
                    <input type="email" name="email" onChange={handleChange} className="text-black px-2 mb-4 valid:border-green-500 invalid:border-red-500" />

                    <span>Password</span>
                    <input type="password" name="password" className="text-black px-2 mb-8" onChange={handleChange} />
                    <span>Do not have an account?
                        <Link to='/register'>
                            <br />
                            <span className="text-green-500 hover:underline"> Sign Up</span>
                        </Link>
                        <span>  instead</span>
                    </span>
                    <button onClick={handleSubmit} className="bg-emerald-700 text-gray-100 h-8 w-24 mt-4 rounded-full hover:bg-emerald-800"> Submit</button>

                    <br />


                </form>
            </div>
        </div>
    </>
    )
}

export default Login