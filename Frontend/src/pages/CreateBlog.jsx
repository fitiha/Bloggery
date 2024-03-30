import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import isObjectEmpty from '../functions/isObjectEmpty.';
import { addUser } from "../redux/slices/currentUserSlice";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { InputLabel, MenuItem, Select } from "@mui/material";

const CreateBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const currentUser = useSelector((state) => state.currentUser.value);
    const categories = ['Technology', 'Health', 'Science', 'Business', 'Entertainment', 'Sports', 'Education', 'Lifestyle', 'Travel', 'Fashion', 'Food', 'Music', 'Politics', 'Art', 'Environment', 'Others'];

    // rehydrate the store if page is refreshed or if the token is expired navigate to login page
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
        setData({ ...data, [e.target.name]: e.target.value, userId: currentUser.userId, author: currentUser.userName });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/user/create', data, {
                headers: { authorization: `Bearer ${currentUser.token}` }
            });
            navigate('/');
            toast.success("Blog created successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred");
            if (err.response?.data?.error === "Token expired") {
                navigate('/login');
            }
        }
    };

    return (<div className="bg-gray-100 px-24">
        <div className="flex justify-start items-center ml-16 pt-8">
            <Link to={'/'}>
                <ArrowBackIcon className="text-gray-600 mt-4 hover:text-blue-500" style={{ fontSize: '2rem' }} />
            </Link>
        </div>
        <div className="flex justify-center items-start pt-8 min-h-screen">
            <div className="w-full max-w-2xl p-8 rounded-xl bg-white shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Create Your Own Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        fullWidth
                        label="Blog Title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Blog Content"
                        variant="outlined"
                        name="content"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        required
                    />
                    <div >
                        <InputLabel id="demo-simple-select-label">Blog Category</InputLabel>
                        <Select
                            className="w-full"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="category"
                            value={data.category || ''}
                            label="Blog Category"
                            onChange={handleChange}
                            required
                        >
                            {categories.map((category, index) => {
                                return <MenuItem key={index} value={category}>{category}</MenuItem>
                            })
                            }
                        </Select>

                    </div>
                    <div className="flex justify-between">
                        <Button
                            variant="outlined"
                            type="submit"
                            sx={{
                                backgroundColor: 'gray',
                                color: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'black',
                                },
                            }}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default CreateBlog;
