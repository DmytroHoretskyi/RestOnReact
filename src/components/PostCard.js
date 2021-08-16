import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export const PostCard = ({id, title, body}) => {
    return (
        <Col className={'m-1'}>
            <Card style={{width: '18rem', height: '100%'}} >
                <Card.Body className={'d-flex flex-column'}>
                    <Card.Title className={'font-weight-bold'}>{title}</Card.Title>
                    <Card.Text className={'flex-grow-1'}>{body}</Card.Text>
                    <Link to={`/details/post/${id}`} className={'btn btn-primary'}>See details</Link>
                </Card.Body>
            </Card>
        </Col>
    );
}
