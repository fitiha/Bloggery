import { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import axios from 'axios';


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user');
                setUsers(response.data.users);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, []);

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email', // Assuming 'email' is the correct key in user data
            key: 'email',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Blogs',
            dataIndex: 'blogs', // Assuming 'blogs' is the correct key in user data
            key: 'blogs',
            filters: [
                { text: 'London', value: 'London' },
                { text: 'New York', value: 'New York' },
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button className='text-gray-200' onClick={clearFilters}>Clear filters</Button>
                <Button className='text-gray-200' onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table

                columns={columns}
                dataSource={users}
                onChange={handleChange}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 'calc(100vh - 200px)' }}
            />
        </>
    );
};

export default ManageUsers;
