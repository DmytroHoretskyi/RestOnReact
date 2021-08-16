import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Nav, Navbar, Form, Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {fetchData} from '../services/fetchData';

export const EditScreen = ({match: {params}}) => {
    const postID = params.id;
    const history = useHistory();

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postUserId, setPostUserId] = useState('');

    const fetchPost = async () => {
        try {
            const res = await fetchData.getPostInfo(postID);
            setPostTitle(res.data.title);
            setPostBody(res.data.body);
            setPostUserId(res.data.userId);
        } catch (err) {
            alert('Failed to fetch post info!');
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const handleSubmit = async () => {
        try {
            if (!postTitle || !postBody) {
                alert('Title and Body are required!');
                return;
            }

            const post = {
                title: '',
                body: '',
                userId: postUserId,
                id: postID
            }

            await fetchData.addNewPost(post);
            alert('Post added successfully!');
            history.replace('/');
        } catch (err) {
            alert('Post add failed!');
        }
    };

    if (!postTitle || !postBody) {
        return (
            <Container>
                <Col>
                    <p>Loading post info...</p>
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
                        <Nav.Link href={`/details/post/${postID}`}>Go back to post details</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <h1 className={'text-center'}>Edit the Post</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter post title"
                            onChange={e => setPostTitle(e.target.value)}
                            value={postTitle}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter post body"
                            onChange={e => setPostBody(e.target.value)}
                            value={postBody}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Form>
            </Container>
        </>
    );
};
