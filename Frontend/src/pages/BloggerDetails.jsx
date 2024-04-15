import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article'
import { toast } from "react-toastify";
import isObjectEmpty from "../functions/isObjectEmpty.";
import { addFollowing, removeFollowing, updateFollowing } from "../redux/slices/currentBlogsSlice";


const BloggerDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [followers, setFollowers] = useState(0);
    const [followings, setFollowings] = useState(0);
    const [buttonLabel, setButtonLabel] = useState('Follow');

    const currentUser = useSelector((state) => state.currentUser.value);
    const allFollowingData = useSelector((state) => state.currentBlogs.followings)

    useEffect(() => {
        if (id) {
            const userFollowers = allFollowingData.filter(f => f.followingId == id);
            setFollowers(userFollowers);
            const userFollowings = allFollowingData.filter(f => f.followerId == id);
            setFollowings(userFollowings);
        }
    }, [allFollowingData]);

    useEffect(() => {
        axios.get(`https://bloggery-a3xc.onrender.com/api/user/${id}`)
            .then((response) => {
                setData(response.data.user);
                console.log("response of user data", response.data.user)
            })
            .catch((err) => console.log(err.message));

    }, [id])

    useEffect(() => {
        axios.get(`https://bloggery-a3xc.onrender.com/api/blog/user/${id}`)
            .then((response) => {
                setBlogs(response.data.blog);
            })
            .catch((err) => console.log(err.message));
    }, [id]);

    const handleFollowClick = async () => {
        if (!isObjectEmpty(currentUser)) {
            if (buttonLabel == 'Follow') {
                const tempId = Math.floor(1000 + Math.random() * 9000);
                setButtonLabel("Following")
                dispatch(addFollowing({ _id: tempId, followerId: currentUser.userId, followingId: id }));
                const response = await axios.post('https://bloggery-a3xc.onrender.com/api/user/follow', { followerId: userInTheStore.userId, followingId: blog.userId._id })
                dispatch(updateFollowing({ tempId: tempId, newFollowing: response.data.followed }))
                console.log("response of following: ", response);
            } else {
                setButtonLabel("Follow")
                dispatch(removeFollowing({ followerId: currentUser.userId, followingId: id }))
                const response = await axios.post('https://bloggery-a3xc.onrender.com/api/user/unfollow', { followerId: currentUser.userId, followingId: id })
                console.log("response of un following: ", response);
            }
        } else {
            toast.warn("Login or signup to complete this operation.")
        }
    }

    return (<>
        <div className="lg:px-24 pt-4 bg-gray-100 min-h-screen">
            <div className="flex justify-start items-center ml-16 mt-4">

                <Link to={'/home'}>
                    <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                </Link>
            </div>

            <div>
                <div className="flex justify-center mt-4 mb-1 ">
                    <div className="flex-col mx-8 w-full lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-4/5 h-auto p-8 rounded-t-3xl bg-gray-950">
                        <img

                            src={`https://bloggery-a3xc.onrender.com/uploads/${data.avatar}` || 'https://bloggery-a3xc.onrender.com/uploads/avatar-1711788042524.jpg'}
                            alt={data.name}
                            className="h-44 w-44 float-left mr-8 rounded-full border-8 border-gray-300 hover:blur-sm"
                        />

                        <div className="flex-col lg:pl-12 text-gray-300">
                            <h1 className="text-3xl mt-4 font-bold leading-relaxed">{data.name}</h1>
                            <>
                                <h1 className="lg:text-xl text-md font-light mb-2">{data.email}</h1>
                                <div className="flex lg:gap-8 gap-4 mb-4">
                                    <h1 className="lg:text-xl text-md font-light"> <span className="font-bold">{blogs.length}</span> Posts</h1>
                                    <h1 className="lg:text-xl text-md font-light"><span className="font-bold">{followers.length}</span> Followers</h1>
                                    <h1 className="lg:text-xl text-md font-light"><span className="font-bold">{followings.length}</span> Following</h1>
                                </div>
                            </>
                        </div>
                        <div className="flex items-center ml-3">
                            <button
                                // type="submit"
                                onClick={handleFollowClick}
                                className="disable bg-gray-800 text-gray-100 h-10 w-36 pb-0.5 rounded-lg font-medium text-lg hover:bg-gray-100 hover:text-gray-950 hover:border hover:border-gray-950 transition-colors"
                            >
                                {buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>
                <>
                    <div className="flex justify-center mt-px">
                        <div className="flex-col mx-8 lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-3/5 h-auto border-b-4 border-indigo-950 p-8 rounded-b-3xl bg-gray-950">
                            <div>
                                <h1 className="font-light text-slate-100 text-xl mb-4 underline underline-offset-4"> <ArticleIcon />Blogs List</h1>

                                <div>
                                    {
                                        (blogs.length == 0 ? <h1 className="font-light text-gray-400">No blogs here yet.</h1> :
                                            blogs.map((blog, index) => {
                                                return (<>
                                                    <Link to={`/detail/${blog._id}`}>
                                                        <List key={index} sx={{ width: '100%' }} className="odd:bg-slate-400 even:bg-gray-400 hover:bg-gray-500">
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
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" className="h-0.5 bg-red-800" />
                                                        </List>
                                                    </Link>
                                                </>
                                                )
                                            })
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    </>
    )
}

export default BloggerDetails;