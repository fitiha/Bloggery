import { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { useSelector } from 'react-redux';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const blogsInTheStore = useSelector((state) => state.currentBlogs.value);

    useEffect(() => {
        setBlogs(blogsInTheStore);

    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.author || null,
            onFilter: (value, record) => record.author.includes(value),
            sorter: (a, b) => (a.author || '').localeCompare(b.author || ''),
            sortOrder: sortedInfo.columnKey === 'author' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button className='text-gray-200' onClick={setAgeSort}>Sort age</Button>
                <Button className='text-gray-200' onClick={clearFilters}>Clear filters</Button>
                <Button className='text-gray-200' onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={blogs}
                onChange={handleChange}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 'calc(100vh - 200px)' }}
            />
        </>
    );
};

export default ManageBlogs;
