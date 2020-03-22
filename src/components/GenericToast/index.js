import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Toast, Row, Col, Button } from 'react-bootstrap';

function GenericModal({phrase, show}){
  return(
    <div className="main-toast">
      <Row>
          <Col xs={6}>
            <Toast show={show}>
              {/* <Toast.Header>
                <strong className="mr-auto">Bootstrap</strong>
              </Toast.Header> */}
              <Toast.Body>{phrase}!</Toast.Body>
            </Toast>
          </Col>
        </Row>
    </div>
  )
}

export default GenericModal;