import React from 'react';
import Questions from '../Questions/Questions';
import { Row, Col } from 'reactstrap';

const HomePage = () => {
    return(
        <Row>
            <Col>      
                <Questions/>
            </Col>
        </Row>
    );
}

export default HomePage;