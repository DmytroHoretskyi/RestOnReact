import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Nav, Navbar, Form, Button} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom";
import {fetchData} from '../services/fetchData';

export const AddScreen = ({match: {params}}) => {
    const userID = params.id;
    const history = useHistory();

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const handleSubmit = async () => {
        try {
            if (!postTitle || !postBody) {
                alert('Title and Body are required!');
                return;
            }

            const post = {
                title: '',
                body: '',
                userId: userID
            }

            await fetchData.addNewPost(post);
            alert('Post added successfully!');
            console.log(post)
            history.replace('/');
        } catch (err) {
            alert('Post add failed!');
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className={'mb-3'}>
                <Navbar.Brand href="/">USERS POST'S</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-grow-1">
                        <Nav.Link href={`/posts/${userID}`}>Go back to users post</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <h1 className={'text-center'}>Create a new Post</h1>
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
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    )
};
