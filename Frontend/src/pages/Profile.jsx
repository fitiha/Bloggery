import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResponsiveDialog from "./popups/DeleteConfirmationModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/slices/currentUserSlice";
// import { addUser } from "../redux/slices/currentUserSlice";
import ArticleIcon from '@mui/icons-material/Article'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [deleteOpenState, setDeleteOpenState] = useState(false);
    const [logoutOpenState, setLogoutOpenState] = useState(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState(null);

    const currentUser = useSelector((state) => state.currentUser.value);

    // if the user refreshes the page fetch the data from the local storage and add it to the store
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     const token = JSON.parse(localStorage.getItem('token'));
    //     const userId = JSON.parse(localStorage.getItem('userId'));
    //     const email = JSON.parse(localStorage.getItem('email'));
    //     const avatar = JSON.parse(localStorage.getItem('avatar'));

    //     if (user && token) {
    //         dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email, avatar: avatar }));
    //     }
    // }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${currentUser.userId}`)
            .then((response) => {
                setData(response.data.user);
                console.log("response of user data", response.data.user)
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

    const handleLogout = () => {
        navigate('/');
        dispatch(clearState());
        toast.success("Logged out successfully.")
    };

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

    console.log("current user: ", currentUser.avatar)


    return (<>
        <div className="lg:px-24 pt-4 bg-gray-100 min-h-screen">
            <div className="flex justify-start items-center ml-16 mt-4">
                <Link to={'/'}>
                    <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                </Link>
            </div>
            <ResponsiveDialog
                message="Do you really want to delete this blog?"
                isOpen={deleteOpenState}
                onClose={() => setDeleteOpenState(false)}
                x={blogIdToDelete}
                onConfirm={handleConfirmDelete}
            />

            <ResponsiveDialog
                message="Do you really want to logout?"
                isOpen={logoutOpenState}
                onClose={() => setLogoutOpenState(false)}
                onConfirm={handleLogout}
            />

            <div>
                <div className="flex justify-center mt-4 mb-1 ">
                    <div className="flex-col mx-8 w-full lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-4/5 h-auto p-8 rounded-t-3xl bg-gray-950">
                        <img
                            src={`http://localhost:5000/uploads/${currentUser.avatar}`}
                            alt={data.name}
                            className="h-44 w-44 float-left mr-8 rounded-full border-8 border-gray-300 hover:blur-sm"
                        />

                        <div className="flex-col pl-12 text-gray-300">
                            <h1 className="text-3xl mt-4 font-bold leading-relaxed">{data.name}</h1>
                            <h1 className="text-xl font-light mb-2">{data.email}</h1>
                            <div className="flex lg:gap-8 sm:gap-4 mb-4">
                                <h1 className="text-xl font-light"> <span className="font-bold">{blogs.length}</span> Posts</h1>
                                <h1 className="text-xl font-light">Followers</h1>
                                <h1 className="text-xl font-light">Following</h1>
                            </div>
                            <div className="flex gap-4">
                                <Link to="/edit-profile">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                borderColor: 'blue',
                                                backgroundColor: 'gray',
                                            },
                                        }}
                                    >Edit Profile</Button>
                                </Link>

                                <Button variant="outlined"
                                    startIcon={< PowerSettingsNewIcon />}
                                    sx={{
                                        backgroundColor: 'brown',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'darkred',
                                            backgroundColor: 'darkred',
                                        },
                                    }} onClick={() => setLogoutOpenState(true)}>
                                    Logout</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-px">
                    <div className="flex-col mx-8 lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-3/5 h-auto border-b-4 border-indigo-950 p-8 rounded-b-3xl bg-gray-950">
                        <div>
                            <h1 className="font-light text-slate-100 text-xl mb-4 underline underline-offset-4"> <ArticleIcon />Your Blogs</h1>

                            <div>
                                {
                                    (blogs.length == 0 ? <h1 className="font-light text-gray-400">No blogs here yet.</h1> :
                                        blogs.map((blog, index) => {
                                            return (<>
                                                <List key={index} sx={{ width: '100%' }} className="odd:bg-slate-400 even:bg-gray-400">
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt={blog.title} src="#" />
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
                                                                        <p className="line-clamp-2">{blog.content}</p>
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
        </div>
    </>
    )
}

export default Profile