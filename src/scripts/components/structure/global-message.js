import React from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

export default ({ globalMessage, resetMessageAction }) => {
    if (globalMessage.get('message')) {
        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <Alert
                            className="margin-top-2x"
                            bsStyle={globalMessage.get('type') || 'info'}
                            onDismiss={resetMessageAction}>
                            {globalMessage.get('message')}
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        );
    } else {
        return null;
    }

};