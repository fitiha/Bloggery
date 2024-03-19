import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Nat',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Yg ',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'ygo',
        email: 'ygo@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;
