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

const EditPosition = () => {
  const myRef = useRef(null);

  const params = useParams();
  const [loadData, setIsLoadData] = useState({
    Job_title: "",
    Positions: "",
    Department: "",
    Due_date: "",
    Location: "",
    Job_description: "",
  });

  // get singal api
  useEffect(() => {
    fetch(`http://localhost:3000/api/dashboard/${params.id}/`, {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("changed data ==>", loadData);

    fetch(`http://localhost:3000/api/dashboard/${params.id}/`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loadData),
    })
      .then((res) => res.json())
      .then((data) => console.log("final data --> ", data))
      .catch((error) => {
        console.log(error);
      });

    myRef.current.reset();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Developers | Add Developers Position</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Edit Position" pageTitle="Position" />
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
                        name="Job_title"
                        value={loadData.Job_title}
                        onChange={handleUpdate}
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
                        name="Positions"
                        value={loadData.Positions}
                        onChange={handleUpdate}
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
                        name="Department"
                        value={loadData.Department}
                        onChange={handleUpdate}
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
                        name="Location"
                        value={loadData.Location}
                        onChange={handleUpdate}
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
                        width
                        name="Due_date"
                        value={loadData.Due_date}
                        onChange={handleUpdate}
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
                        name="Job_description"
                        value={loadData.Job_description}
                        onChange={handleUpdate}
                        required
                      ></textarea>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-start mb-4">
                  <button type="submit" className="btn btn-success w-sm">
                    Update
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

export default EditPosition;
