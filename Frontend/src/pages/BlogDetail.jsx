import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const b = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blog/${b.id}`)
            .then((response) => {
                console.log(response.data.blog);
                setBlog(response.data.blog);
            })
            .catch((err) => console.log(err.message));
    }, [])

    return (<>
        <Link to={'/'} >
            <ArrowBackIcon className="ml-16 h-8 w-8 hover:bg-sky-800 hover:text-gray-200 rounded-full" />
        </Link>
        <div className="pl-24 text-slate-200 h-screen m-8 p-8 rounded-t-3xl bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950">
            <h1 className="font-light text-6xl ml-4">{blog.title}</h1>
            <div className="font-light text-xl ml-4 mt-3">
                <span>Written By: </span>
                <span className="text-orange-700 font-bold">{blog.author}</span>
            </div>
            <div className="font-light text-xl p-4  mt-3 text-justify">
                <p >{blog.content}</p>

            </div>
            <hr />
        </div>
    </>
    )
}

export default BlogDetail