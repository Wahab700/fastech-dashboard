import React, { useState, useEffect, useRef } from "react";
import { call, put } from "redux-saga/effects";
import { Link, useParams } from "react-router-dom";
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

const EditBlog = () => {
  const myRef = useRef(null);

  const params = useParams();
  const [loadData, setIsLoadData] = useState({
    image: "",
    Category: "",
    Title: "",
  });

  // get singal api
  useEffect(() => {
    fetch(`http://localhost:3000/api/blogs/${params.id}/`, {
      method: "GET",
    })
      .then((result) => {
        result.json().then((response) => {
          console.log("updated data => ", response);
          setIsLoadData(response.data);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("single data ==> ", loadData);

  const handleUpdate = (e) => {
    setIsLoadData({ ...loadData, [e.target.name]: e.target.value });
  };

  // put api updated data
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("changed data ==>", loadData);

  //     fetch(`http://localhost:3000/api/blogs/${params.id}/`, {
  //       method: "PUT",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loadData),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log("final data --> ", data))
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     myRef.current.reset();
  //   };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Blogs | Edit Blogs </title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Edit Blogs" pageTitle="Blogs" />
          <form>
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
                        name="image"
                        value={loadData.image}
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
                        name="Category"
                        value={loadData.Category}
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
                        name="Title"
                        value={loadData.Title}
                      />
                    </div>
                  </CardBody>
                </Card>

                <div className="text-start mb-4">
                  <button type="submit" className="btn btn-success w-sm">
                    update
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

export default EditBlog;
