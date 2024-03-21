import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ResponsiveDialog from "./popups/DeleteConfirmationModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/slices/currentUserSlice";
import { addUser } from "../redux/slices/currentUserSlice";
import ArticleIcon from '@mui/icons-material/Article';
import { toast } from "react-toastify";

const Profile = () => {
    const fileInput = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearState());
        toast.success("Logged out successfully.")
        navigate('/');
    };

    const handleImageClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file); // image file
    };

    const [data, setData] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [deleteOpenState, setDeleteOpenState] = useState(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState(null);

    const currentUser = useSelector((state) => state.currentUser.value);

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

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${currentUser.userId}`)
            .then((response) => {
                setData(response.data.user);
            })
            .catch((err) => console.log(err.message));
    }, [currentUser.userId])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blog/user/${currentUser.userId}`)
            .then((response) => {
                setBlogs(response.data.blog);
            })
            .catch((err) => console.log(err.message));
    }, [currentUser.userId]);

    const handleDeleteConfirmation = (blogId) => {
        setBlogIdToDelete(blogId);
        setDeleteOpenState(true);
    };

    const handleConfirmDelete = async (blogId) => {
        try {
            await axios.delete(`http://localhost:5000/api/blog/${blogId}`);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error('Error deleting blog:', error.message);
        }
        setDeleteOpenState(false);
        setBlogIdToDelete(null);
    };



    return (<>
        <Link to={'/'} >
            <ArrowBackIcon className="ml-16 h-8 w-8 hover:bg-sky-800 hover:text-gray-200 rounded-full" />
        </Link>
        <ResponsiveDialog
            isOpen={deleteOpenState}
            onClose={() => setDeleteOpenState(false)}
            x={blogIdToDelete}
            onConfirm={handleConfirmDelete}
        />

        <div>
            <div className="flex justify-center mt-8 mb-1 ">
                <div className="flex-col  w-2/5 h-auto border-b-4 border-indigo-950 p-8 rounded-t-3xl bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950">
                    <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={data.name}
                        className="h-44 w-44 float-left mr-8 rounded-full border-8 border-gray-300 hover:blur-sm"
                        onClick={handleImageClick}
                    />
                    <input
                        type="file"
                        accept=".jpg"
                        style={{ display: 'none' }}
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    <div className="flex-col pl-12 text-gray-300">
                        <h1 className="text-3xl mt-4 font-bold leading-relaxed">{data.name}</h1>
                        <h1 className="text-xl font-light mb-8">{data.email}</h1>
                        <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <div className="flex-col w-2/5 h-auto border-b-4 border-indigo-950 p-8 rounded-b-3xl bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950">
                    <div>
                        <h1 className="font-light text-slate-100 text-xl mb-4 underline underline-offset-4"> <ArticleIcon />Your Blogs</h1>

                        <div>
                            {
                                (blogs.length == 0 ? <h1 className="font-light text-gray-400">No blogs here yet.</h1> :
                                    blogs.map((blog, index) => {
                                        return (<>
                                            <List key={index} sx={{ width: '100%' }} className="bg-gray-400">
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={blog.title} src="/static/images/avatar/1.jpg" />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={blog.title}
                                                        secondary={
                                                            <div className="mr-4">
                                                                <React.Fragment >
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {data.name}
                                                                    </Typography>
                                                                    <p className="text-nowrap text-ellipsis overflow-hidden">{blog.content}</p>
                                                                </React.Fragment>
                                                            </div>
                                                        }
                                                    />

                                                    <div className="grid grid-rows-1 gap-5">
                                                        <Link to={`/edit/${blog._id}`}>
                                                            <EditNoteIcon className="hover:text-sky-600" />
                                                        </Link>

                                                        <DeleteIcon className="hover:text-red-600" onClick={() => {
                                                            setDeleteOpenState(true)
                                                            handleDeleteConfirmation(blog._id)
                                                        }} />
                                                    </div>

                                                </ListItem>

                                                <Divider variant="inset" component="li" className="h-0.5 bg-red-800" />
                                            </List>
                                        </>
                                        )
                                    })
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Profile