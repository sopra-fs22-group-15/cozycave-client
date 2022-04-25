import React from 'react';
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {faSave, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProfilePage = () => {
    return (
      <Container className="d-flex justify-content-center">
          <Card style={{marginTop: "100px"}}>
              <Card.Header className="d-flex justify-content-center" style={{backgroundColor: "lightblue"}}>
                  <Row>
                      <Col className="d-flex flex-column align-items-center ">
                          <img style={{borderRadius: "100px"}}
                               src={'https://www.gravatar.com/avatar/' + '0' + '?s=150'} alt={'profile'}/>
                          <h1>John Doe</h1>
                          <h5>johnthedoe</h5>
                      </Col>
                  </Row>
              </Card.Header>
              <Card.Body>
                  <Form>
                      <Row>
                          <Form.Group>
                              <Form.Label>Username</Form.Label>
                              <Form.Control type="text" placeholder="johnthedoe"/>
                          </Form.Group>
                      </Row>
                      <Row>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Birthdate</Form.Label>
                                  <Form.Control type="date" placeholder="Birthdate"/>
                              </Form.Group>
                          </Col>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Gender</Form.Label>
                                  <Form.Select aria-label="male">
                                      <option>Male</option>
                                      <option value="1">Female</option>
                                      <option value="2">Other</option>
                                      <option value="3">Prefer not to tell</option>
                                  </Form.Select>
                              </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Form.Group>
                              <Form.Label>Occupation</Form.Label>
                              <Form.Select type="text" placeholder="Student">
                                  <option value="1">Student</option>
                                  <option value="2">Landlord</option>
                              </Form.Select>
                          </Form.Group>
                      </Row>
                      <Row>
                          <Form.Group>
                              <Form.Label>Biography</Form.Label>
                              <Form.Control as="textarea" rows="10" placeholder="Tell us about yourself"/>
                          </Form.Group>
                      </Row>
                  </Form>
              </Card.Body>
              <Card.Footer>
                  <Row>
                      <Col className="d-flex justify-content-center align-content-center">
                          <Button variant="primary" size="lg" block>
                              <FontAwesomeIcon icon={faSave}/>
                          </Button>
                      </Col>
                  </Row>
              </Card.Footer>
          </Card>
      </Container>
    );
};

export default ProfilePage;