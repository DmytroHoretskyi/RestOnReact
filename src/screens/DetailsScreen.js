import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Navbar, Nav, ListGroup, Button} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom";
import {fetchData} from '../services/fetchData';


export const DetailsScreen = ({match: {params}}) => {
    const postID = params.id;
    const history = useHistory();

    const [comments, setComments] = useState(null);
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        try {
            const res = await fetchData.getPostInfo(postID);
            setPost(res.data);
        } catch (err) {
            alert('Failed to fetch post info!');
        }
    };

    const fetchComments = async () => {
        try {
            const res = await fetchData.getComments(postID);
            setComments(res.data);
        } catch (err) {
            alert('Failed to fetch comments!');
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    const deletePost = async () => {
        try {
            await fetchData.deletePost(postID);
            alert('Post Deleted!');
            history.replace('/');
        } catch (err) {
            alert('Delete failed!');
        }
    };

    if (!post || !comments) {
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
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Row>
                    <Col className={'flex-grow-0'}>
                        <Card style={{width: '18rem'}} >
                            <Card.Body className={'d-flex flex-column'}>
                                <Card.Title className={'font-weight-bold'}>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <div className={"d-flex justify-content-center"}>
                                    <Link to={`/edit-post/${post.id}`} className={'btn btn-primary mr-2'}>Edit</Link>
                                    <Button variant={'danger'} onClick={deletePost}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <h2 className={'text-center'}>Comments</h2>
                        <ListGroup>
                            {
                                comments.map(comment => (
                                    <ListGroup.Item key={comment.id}>
                                        <Row>
                                            <div className={'font-weight-bold mr-3'}>{comment.name}</div>
                                            <div>{'<' + comment.email + '>'}</div>
                                        </Row>
                                        <hr/>
                                        <Row>{comment.body}</Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
