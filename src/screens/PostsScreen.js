import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Nav, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {fetchData} from '../services/fetchData';
import {PostCard} from "../components/PostCard";

export const PostsScreen = ({match: {params}}) => {
    const userID = params.id;
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await fetchData.getPosts(userID);
            setPosts(res.data);
        } catch (err) {
            alert('Failed to fetch posts');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (!posts) {
        return (
            <Container>
                <Col>
                    <p>Loading data...</p>
                </Col>
            </Container>
        )
    }


    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className={'mb-3'}>
                <Navbar.Brand href="/">USERS POST'S</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-grow-1">
                        <Nav.Link className={'ml-auto btn btn-success text-white'} href={`/add-post/${userID}`}>Add new post</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>

                <Row>
                    {
                        posts.map(post => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                            />
                        ))
                    }
                </Row>
            </Container>
        </>
    );
};
