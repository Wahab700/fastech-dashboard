import React, { useState, useEffect, useRef } from "react";
import { call, put } from "redux-saga/effects";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import MetaTags from "react-meta-tags";

const DevelopersPosition = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const myRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    let data = {
      Job_title: title,
      Positions: position,
      Department: department,
      Due_date: date,
      Location: location,
      Job_description: description,
    };

    fetch("http://localhost:3000/api/dashboard/", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log("I got the data --> ", data));

    setTitle("");
    setPosition("");
    setDepartment("");
    setDate("");
    setLocation("");
    setDescription("");
    myRef.current.reset();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Developers | Add Developers Position</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Add Position" pageTitle="Position" />
          <form onSubmit={handleSubmit} ref={myRef}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Job Title
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Job Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Positions
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Positions"
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Department
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Department"
                        onChange={(e) => {
                          setDepartment(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Location
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Location"
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Date
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Date"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Description
                      </Label>

                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Job Description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        required
                      ></textarea>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-start mb-4">
                  <button type="submit" className="btn btn-success w-sm">
                    Create
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DevelopersPosition;
