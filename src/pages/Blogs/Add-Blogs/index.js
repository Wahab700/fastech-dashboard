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

const AddBlog = () => {
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const myRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");

    let data = {
      image: img,
      Category: category,
      Title: title,
    };

    fetch("http://localhost:3000/api/blogs/", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log("I got the data --> ", data));

    setImg("");
    setCategory("");
    setTitle("");
    myRef.current.reset();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Blogs | Add Blogs</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Add Blogs" pageTitle="Blogs" />
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
                        Image url
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Job Title"
                        onChange={(e) => {
                          setImg(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Category
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Positions"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Title
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Department"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
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

export default AddBlog;
