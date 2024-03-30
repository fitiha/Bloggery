import axios from "axios";
import ListIcon from '@mui/icons-material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../redux/slices/currentUserSlice";
import { addBlogs, decrementLikes, incrementLikes } from "../redux/slices/currentBlogsSlice";
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { formatDistanceToNow } from 'date-fns';
import isObjectEmpty from '../functions/isObjectEmpty.'
import { IconButton } from "@mui/material";

const Home = () => {
    const [label, setLabel] = useState("Categories");
    const [data, setData] = useState([]);

    const [likedBlogs, setLikedBlogs] = useState({});
    // const [likeAmt, setLikeAmt] = useState(0);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const categories = ['All', 'Technology', 'Health', 'Science', 'Business', 'Entertainment', 'Sports', 'Education', 'Lifestyle', 'Travel', 'Fashion', 'Food', 'Music', 'Politics', 'Art', 'Environment', 'Others'];
    const blogsInTheStore = useSelector((state) => state.currentBlogs.value);
    const userInTheStore = useSelector((state) => state.currentUser.value);


    const toggleLike = (bId) => {
        if (isObjectEmpty(userInTheStore)) {
            toast.error("Please login or sign up to like blogs.");
            return; // Exit early if the user is not logged in.
        }
        const isLiked = !likedBlogs[bId];

        // Update the UI optimistically
        setLikedBlogs(prevState => ({ ...prevState, [bId]: isLiked }));
        const likeMessage = {
            blogId: bId,
            userId: userInTheStore.userId
        };

        // Use the newly determined state to decide whether to increment or decrement.
        if (isLiked) {
            dispatch(incrementLikes({ id: bId }));
            setData(blogsInTheStore.map((blog) => blog._id === bId ? { ...blog, likes: blog.likes + 1 } : blog));
            axios.post("http://localhost:5000/api/user/like", likeMessage)
                .then((response) => {
                    console.log(response.data.message);
                    // toast.success(response.data.message);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    // toast.error(err.response.data.message);
                });
        } else {
            dispatch(decrementLikes({ id: bId }));
            setData(blogsInTheStore.map((blog) => blog._id === bId ? { ...blog, likes: blog.likes - 1 } : blog));
            axios.post("http://localhost:5000/api/user/unlike", likeMessage)
                .then((response) => {
                    // toast.success(response.data.message);
                    console.log(response.data.message);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
    };

    useEffect(() => {
        if (!isObjectEmpty(userInTheStore)) {
            axios.get(`http://localhost:5000/api/user/likes/${userInTheStore.userId}`)
                .then((d) => {
                    const lBlog = d.data.response.map((blog) => blog.blogId);
                    lBlog.forEach((blogId) => {
                        setLikedBlogs(prevState => ({ ...prevState, [blogId]: true }));
                    })
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
        }
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/api/blog")
            .then((response) => {
                setData(response.data.blogs);
                dispatch(addBlogs(response.data.blogs))
            })
            .catch((err) => {
                console.log(err)
                toast.error("Network Error. Try refreshing the page.")
            });
    }, [])

    // if the user refreshes the page fetch the login data from the local storage and add it to the store
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email }));
        }
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setData(blogsInTheStore);
        setLabel(e.target.innerText)
        if (e.target.innerText == "All") return;
        setData(prevBlogs => prevBlogs.filter(blog => blog.category == e.target.innerText));
    };

    return (
        <div className="px-24 pt-8 min-h-screen bg-gray-100">
            <Typography variant="h4" gutterBottom className="font-light text-4xl flex items-center justify-between">
                <h1 className="font-['Quattrocento'] font-bold">  Latest Blogs</h1>
                <div>
                    {location.pathname == "/" &&
                        <div>
                            <span className="text-base font-['Quattrocento'] mr-1">{label}</span>
                            <ListIcon className="cursor-pointer mt-2" onClick={handleMenu} />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} onClick={handleClose}>{category}</MenuItem>
                                ))}
                            </Menu>
                        </div>}
                </div>
            </Typography>
            <hr className="bg-zinc-300 h-0.5 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-['Quattrocento']">
                {
                    data.length < 1 ?
                        <h1>No Blogs in this category</h1> :
                        (data.slice().reverse().map((blog) => (<>
                            <Card key={blog._id} className="bg-gray-100 hover:shadow-lg transition-shadow flex flex-col">
                                <div className="hover:bg-gray-100 flex-grow">
                                    <Link to={`/detail/${blog._id}`}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" className="capitalize line-clamp-2" >
                                                <p className="font-['Quattrocento']"> {blog.title}</p>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" className="line-clamp-2 mt-2">
                                                <p className="font-['Quattrocento']">{blog.content}</p>
                                            </Typography>
                                            <Typography variant="overline" display="block" className="mt-4">
                                                <p className="font-['Quattrocento'] font-bold"> Author: {blog.author}</p>
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </div>
                                <hr className="bg-gray-100" />
                                <CardActions className="mt-auto flex items-center justify-between mx-4">
                                    <span className="text-sm text-green-600">{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>

                                    <div className="flex gap-1 mr-4">
                                        <span className="pt-2 after:bg-red-300">{blog.likes}</span>
                                        <IconButton onClickCapture={() => toggleLike(blog._id)} className="p-8">
                                            {likedBlogs[blog._id] ? <FavoriteOutlinedIcon sx={{ color: 'red' }} /> : <FavoriteBorderOutlinedIcon />}
                                        </IconButton>
                                    </div>

                                </CardActions>
                            </Card>
                        </>
                        )))
                }
            </div>
        </div>
    );
};

export default Home;