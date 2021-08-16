import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Container, Table} from 'react-bootstrap';
import {fetchData} from '../services/fetchData';

export const UsersScreen = () => {
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetchData.getAllUsers();
            setUsers(res.data);
        } catch (err) {
            alert('Failed to fetch users!');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (!users) {
        return (
            <Container>
                <p>Loading users...</p>
            </Container>
        );
    }

    return (
        <Container style={{padding: 16}}>
            <h1 className={'text-center mb-3'}>All Users List</h1>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>
                                    <Link to={`/posts/${user.id}`} className={'btn btn-primary'}>View Posts</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    );
};
