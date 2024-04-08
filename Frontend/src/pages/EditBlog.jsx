import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from "react-router-dom";
import { InputLabel, MenuItem, Select } from "@mui/material";

const EditBlog = () => {
    const navigate = useNavigate();
    const categories = ['Technology', 'Health', 'Science', 'Business', 'Entertainment', 'Sports', 'Education', 'Lifestyle', 'Travel', 'Fashion', 'Food', 'Music', 'Politics', 'Art', 'Environment', 'Others'];
    const [newData, setNewData] = useState({});
    const [blogData, setBlogData] = useState({});
    const currentUser = useSelector((state) => state.currentUser.value);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://bloggery-a3xc.onrender.com/api/blog/${id}`)
            .then((response) => {
                setBlogData(response.data.blog);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleChange = (e) => {
        setBlogData(e.target.value)
        setNewData({ ...newData, [e.target.name]: e.target.value, userId: currentUser.userId, author: currentUser.userName });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://bloggery-a3xc.onrender.com/api/blog/${id}`, newData, {
                headers: { authorization: `Bearer ${currentUser.token}` }
            });
            navigate('/profile');
            toast.success("Blog Edited successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred");
            if (err.response?.data?.error === "Token expired") {
                navigate('/login');
            }
        }
    };

    return (<div className="bg-gray-100">
        <div className="flex justify-start items-center ml-4 lg:ml-16 pt-8">
            <Link to={'/home'}>
                <ArrowBackIcon className="text-gray-600 mt-4 hover:text-blue-500" style={{ fontSize: '2rem' }} />
            </Link>
        </div>
        <div className="flex justify-center items-start pt-8 min-h-screen">
            <div className="w-full max-w-2xl p-8 rounded-xl bg-white shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Edit Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={blogData.title}
                        name="title"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        value={blogData.content}
                        variant="outlined"
                        name="content"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        required
                    />
                    <InputLabel id="demo-simple-select-label">Blog Category</InputLabel>
                    <Select
                        className="w-full"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"

                        label="Blog Category"
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category, index) => {
                            return <MenuItem key={index} value={category}>{category}</MenuItem>
                        })}
                    </Select>
                    {/* <div className="flex justify-between">
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/profile')}>
                            Cancel
                        </Button>
                    </div> */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-gray-800 text-gray-100 w-36 py-2 rounded-lg font-medium text-lg hover:bg-gray-100 hover:text-gray-950 hover:border hover:border-gray-950 transition-colors"
                        >
                            Submit
                        </button>

                        <button onClick={() => navigate('/profile')} className="border border-gray-900 hover:bg-gray-800 hover:text-gray-100 text-gray-950 w-36 rounded-lg font-medium text-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default EditBlog;
