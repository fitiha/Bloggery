import axios from "axios";
import ListIcon from '@mui/icons-material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBlogs, decrementLikes, incrementLikes, setComments, setFollowings } from "../redux/slices/currentBlogsSlice";
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { formatDistanceToNow } from 'date-fns';
import isObjectEmpty from '../functions/isObjectEmpty.'
import { IconButton, TextField } from "@mui/material";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { like, setLikes } from "../redux/slices/currentUserSlice";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Home = () => {
    const [label, setLabel] = useState("Categories");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [likedBlogs, setLikedBlogs] = useState({});
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const categories = ['All', 'Technology', 'Health', 'Science', 'Business', 'Entertainment', 'Sports', 'Education', 'Lifestyle', 'Travel', 'Fashion', 'Food', 'Music', 'Politics', 'Art', 'Environment', 'Others'];
    const blogsInTheStore = useSelector((state) => state.currentBlogs.value);
    const userInTheStore = useSelector((state) => state.currentUser.value);


    const toggleLike = (bId) => {
        if (isObjectEmpty(userInTheStore)) {
            toast.error("Login or signup to complete this operation.");
            return;
        }
        const isLiked = !likedBlogs[bId];

        // Optimistic update
        setLikedBlogs(prevState => ({ ...prevState, [bId]: isLiked }));
        const likeMessage = {
            blogId: bId,
            userId: userInTheStore.userId
        };

        // Use the newly determined state to decide whether to increment or decrement.
        if (isLiked) {
            dispatch(incrementLikes({ id: bId }));
            dispatch(like({ id: bId }))
            setData(blogsInTheStore.map((blog) => blog._id === bId ? { ...blog, likes: blog.likes + 1 } : blog));
            axios.post("https://bloggery-a3xc.onrender.com/api/user/like", likeMessage)
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
            axios.post("https://bloggery-a3xc.onrender.com/api/user/unlike", likeMessage)
                .then((response) => {
                    // toast.success(response.data.message);
                    console.log(response.data.message);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
    };

    // storing all comments in the store
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://bloggery-a3xc.onrender.com/api/blog/comments/all')
            .then((response) => {
                dispatch(setComments(response.data.allComments))
                setIsLoading(false)
            })
            .catch(err => console.log("error: ", err));
        axios.get('https://bloggery-a3xc.onrender.com/api/user/allfollows')
            .then((response) => {
                dispatch(setFollowings(response.data.allFollowingData))
            })
            .catch(err => console.log("error in fetching all followings.", err))
    }, [])

    useEffect(() => {
        setIsLoading(true);
        if (!isObjectEmpty(userInTheStore)) {
            axios.get(`https://bloggery-a3xc.onrender.com/api/user/likes/${userInTheStore.userId}`)
                .then((d) => {
                    const lBlog = d.data.response.map((blog) => blog.blogId);
                    lBlog.forEach((blogId) => {
                        setLikedBlogs(prevState => ({ ...prevState, [blogId]: true }));
                    })
                    setIsLoading(false);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                    setIsLoading(false);
                })
        }
    }, [])
    dispatch(setLikes(likedBlogs));
    // console.log("the user liked blogs are ", likedBlogs)

    useEffect(() => {
        setIsLoading(true)
        axios.get("https://bloggery-a3xc.onrender.com/api/blog")
            .then((response) => {
                setData(response.data.blogs);
                dispatch(addBlogs(response.data.blogs))
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Network Error. Try refreshing the page.")
                setIsLoading(false)
            });
    }, [])

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

    const [searchTerm, setSearchTerm] = useState('');
    const blogNames = blogsInTheStore.map(d => d.title);
    const filteredData = blogNames.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredBlogs = data.filter(d => filteredData.includes(d.title));

    return (<>{
        isLoading ? (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
        ) : (
            <div className="px-4 lg:px-24 pt-8 min-h-screen bg-gray-100">
                <Typography variant="h4" gutterBottom className="font-light text-4xl flex items-center justify-between">
                    <div className="flex gap-8">
                        <h1 className="font-['Quattrocento'] font-bold text-orange-800 lg:text-4xl md:text-3xl text-2xl mt-4">  Latest Blogs</h1>
                        <div className="flex gap-2">
                            <SearchOutlinedIcon className="mt-6" />
                            <TextField
                                label="Search field"
                                type="search"
                                variant="standard"
                                fullWidth
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {location.pathname == "/home" &&
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

                            (filteredBlogs.length > 0 ? filteredBlogs.slice().reverse().map((blog, index) => (<div key={index}>
                                <Card key={index} className="bg-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                                    <div className="hover:bg-gray-900 bg-gray-950 text-gray-100 flex-grow h-40">
                                        <Link to={`/detail/${blog._id}`}>
                                            <CardContent>
                                                <Typography variant="h5" component="div" className="capitalize" >
                                                    <p className="font-['Quattrocento']  line-clamp-1"> {blog.title}</p>
                                                </Typography>
                                                <Typography variant="body2" className="line-clamp-2 mt-2">
                                                    <p className="font-['Quattrocento']">{blog.content}</p>
                                                </Typography>
                                                <Typography variant="overline" display="block" className="mt-4">
                                                    <p className="font-['Quattrocento'] font-bold">  <span className="text-gray-400">Author:</span>{blog.author}</p>
                                                </Typography>
                                            </CardContent>
                                        </Link>
                                    </div>
                                    <hr className="bg-gray-100" />
                                    <CardActions className="mt-auto bg-gray-950 flex items-center justify-between px-4 flex-grow">
                                        <span className="text-sm text-gray-300 ml-3">{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>

                                        <div className="flex gap-1 mr-4 text-gray-100">
                                            <span className="pt-2 after:bg-red-300">{blog.likes}</span>
                                            <IconButton onClickCapture={() => toggleLike(blog._id)} className="p-8">
                                                {likedBlogs[blog._id] ? <FavoriteOutlinedIcon sx={{ color: 'red' }} /> : <FavoriteBorderRounded sx={{ color: 'white' }} />}
                                            </IconButton>
                                        </div>
                                    </CardActions>
                                </Card>
                            </div>
                            )) : <div>
                                <h1>Oops! No Blogs Found.</h1>
                            </div>)
                    }
                </div>
            </div>
        )
    }
    </>
    );
};

export default Home;