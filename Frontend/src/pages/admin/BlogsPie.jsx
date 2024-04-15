import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BlogsPie() {
    const blogsInTheStore = useSelector((state) => state.currentBlogs.value);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (blogsInTheStore) {
            setBlogs(blogsInTheStore);
        }
    }, [blogsInTheStore]);

    const categoryCounts = blogs.reduce((acc, blog) => {
        if (acc[blog.category]) {
            acc[blog.category].value += 1;
        } else {
            acc[blog.category] = {
                id: blog._id,
                name: blog.category,
                value: 1,
                label: blog.category
            };
        }
        return acc;
    }, {});

    const pieChartData = Object.values(categoryCounts);


    return (
        <div style={{ width: 400, height: 330, overflow: 'hidden', }} >
            <h1>Blogs Based On Category</h1>
            <PieChart
                series={[{
                    data: pieChartData,
                    innerRadius: 24,
                    outerRadius: 112,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -169,
                    endAngle: 159,
                    cx: 110,
                    cy: 180
                }]}
            />

        </div>
    );
}
