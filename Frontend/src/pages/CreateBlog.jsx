import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import isObjectEmpty from '../functions/isObjectEmpty.';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const currentUser = useSelector((state) => state.currentUser.value)
    console.log("currentUser", currentUser.userName)

    const isLoggedIn = isObjectEmpty(currentUser);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/register');
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, userId: currentUser.userId, author: currentUser.userName }); //key-value pair
        // console.log("current blog state: ", data)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/user/create', data)
            .then((response) => {
                console.log("Successfully created the blog", response.data)
            })
            .catch(err => console.log(err));
    }

    return (<>
        <div className="pl-80">
            <h1 className="text-4xl ml-16">Create Your Own Blog</h1>
            <form onSubmit={handleSubmit} className="bg-gradient-to-r text-gray-200 rounded-lg from-blue-950 via-orange-950 to-pink-950 flex flex-col h-full w-2/3 p-16">
                <span>Blog Title : </span>
                <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                />

                <span>Blog Body : </span>
                <input
                    name="content"
                    type="text"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-emerald-700 text-gray-100 h-8 w-24 rounded-full mt-4"
                >
                    Submit
                </button>

                <Link to="/" className="bg-emerald-700 text-gray-100 h-8 w-24 rounded-full mt-4 pl-4 pt-1">Cancel</Link> {/* Add a cancel button using Link */}
            </form>
        </div>
    </>
    )
}

export default CreateBlog;
