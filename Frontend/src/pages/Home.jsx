import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/api/blog")
            .then((response) => {
                // console.log(response.data.blogs);
                setData(response.data.blogs);
            })
            .catch((err) => console.log(err.message));
    }, [])

    return (<>
        <div >
            <div>
                <h1 className="font-light text-6xl ml-12">Latest <u>Blogs</u> </h1>
            </div>

            {data.map((blog) => {
                return (<Link to={`/detail/${blog._id}`} key={blog._id}>
                    <div className="font-light text-slate-200 h-44 m-8 p-8 rounded-t-3xl bg-gradient-to-r from-blue-950 via-orange-950 to-pink-950">
                        <h2 className="text-2xl font-semibold">{blog.title}</h2>
                        <p className="text-xl line-clamp-2">{blog.content}</p>
                        <p className="mt-4">Author: {blog.author}</p>
                    </div>
                    <hr />
                </Link>

                )
            })}
        </div>

    </>
    )
}

export default Home