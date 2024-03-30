import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/currentUserSlice";
import { CircularProgress } from '@mui/material';

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blog/${id}`)
            .then((response) => {
                setBlog(response.data.blog);
            })
            .catch((err) => console.error(err.message));
    }, [id]);

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

    if (!blog) {
        return <div className="flex justify-center items-center h-screen">
            <CircularProgress color="inherit" />
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 pb-8">
            <Link to={'/'} className="block p-4">
                <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
            </Link>
            <article className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <p className="text-md mb-2 text-blue-500">Written by: {blog.author}</p>
                <div className="text-gray-700 text-lg whitespace-pre-line">
                    {blog.content}
                </div>
            </article>
        </div>
    );
}

export default BlogDetail;
