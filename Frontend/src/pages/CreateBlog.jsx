import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isObjectEmpty from '../functions/isObjectEmpty.';
import { addUser } from "../redux/slices/currentUserSlice";
import { toast } from "react-toastify";

const CreateBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const currentUser = useSelector((state) => state.currentUser.value)

    // if the user refreshes the page fetch the data from the local storage and add it to the store
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email }));
        }

        if (isObjectEmpty(currentUser)) {
            navigate('/register');
        }
    }, []);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, userId: currentUser.userId, author: currentUser.userName }); //key-value pair
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/user/create', data, { headers: { 'authorization': `Bearer ${currentUser.token}` } })
            .then((response) => {
                console.log(response.data?.message)
                navigate('/');
                toast.success("Blog created successfully")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Token expired") //err.response.data.message 
                navigate('/');
            });
    }

    return (<>
        <div className="pl-80">
            <h1 className="text-4xl ml-16">Create Your Own Blog</h1>
            <form onSubmit={handleSubmit} className="bg-gradient-to-r rounded-lg from-blue-950 via-orange-950 to-pink-950 flex flex-col h-full w-2/3 p-16">
                <span className="text-gray-200">Blog Title : </span>
                <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                />

                <span className="text-gray-200">Blog Body : </span>
                <input
                    name="content"
                    type="text"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-emerald-700 text-gray-100 h-8 w-24 rounded-full mt-4"
                >Submit
                </button>

                <button
                    className="bg-emerald-700 text-gray-100 h-8 w-24 rounded-full mt-4 pl-4 pt-1"
                    onClick={() => navigate('/')}
                >Cancel</button>
            </form>
        </div>
    </>
    )
}

export default CreateBlog;
