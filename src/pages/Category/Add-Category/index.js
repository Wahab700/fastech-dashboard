import React, { useState, useEffect } from "react";
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
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useReducer } from "react";
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddCategories = () => {
  const SingleOptions = [
    { value: "Watches", label: "Watches" },
    { value: "Headset", label: "Headset" },
    { value: "Sweatshirt", label: "Sweatshirt" },
    { value: "20% off", label: "20% off" },
    { value: "4 star", label: "4 star" },
  ];

  // const { CategoriesReducerPost } = useSelector((state) => ({
  //   CategoriesReducerPost: state.CategoriesReducerPost,
  // }));

  // const dispatch = useDispatch();
  // function submitData(finalFormData) {
  //   console.log("Im putting final form data to be -->");
  //   for (var [key, value] of finalFormData.entries()) {
  //     console.log(key, value);
  //   }
  //   dispatch({
  //     type: "CATEGORIE_POST_API",
  //     payload: finalFormData,
  //   });

  //   return 0;
  // }

  // upload file
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setWebFiles(files);
  }
  // formate the file size
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    };
    const res = fetch(
      "http://localhost:3000/api/categories/add",
      requestOptions
    );

    return res;
    // }, []);
  };

  const [webImage, setWebFiles] = useState([]);
  const [mobImage, setMobImage] = useState([]);
  const [bgImage, setBgImage] = useState([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  let finalFormData = new FormData();

  useEffect(() => {
    finalFormData.append("web_img", webImage);
    finalFormData.append("mobile_img", mobImage);
    finalFormData.append("bg_img", bgImage);
    finalFormData.append("name", name);
    finalFormData.append("note", note);
  }, [webImage, mobImage, bgImage, name, note]);

  console.log("form data ==>", finalFormData);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Category | Add Category</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Add Category" pageTitle="Category" />
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Card>
                  <CardBody>
                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="project-title-input"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* <div className="mb-3">
                    <label className="form-label">Feature Image for Web</label>
                    <input
                      className="form-control"
                      onChange={handleChange_1}
                      type="file"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Feature Image for Mobile
                    </label>
                    <input
                      className="form-control"
                      onChange={handleChange_2}
                      type="file"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Background Image for Mobile
                    </label>
                    <input
                      className="form-control"
                      onChange={handleChange_3}
                      type="file"
                    ></input>
                  </div> */}

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Note
                      </Label>

                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter note here"
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-title-input"
                      >
                        Status
                      </Label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option value="1">Published</option>
                        <option value="2">Drafts</option>
                        <option value="3">Decline</option>
                      </select>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-start mb-4">
                  <button type="submit" className="btn btn-success w-sm">
                    Create
                  </button>
                </div>
              </Col>

              <Col lg={4}>
                <div className="card">
                  <CardHeader>
                    <h4 className="card-title mb-0">Feature Image for Web</h4>
                  </CardHeader>

                  <CardBody>
                    <div className="dropzone">
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          handleAcceptedFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone dz-clickable">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <div className="mb-3">
                                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>

                    <div className="list-unstyled mb-0" id="file-previews">
                      {webImage.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>

                    {/* <input
                    type="file"
                    value={webImage}
                    onChange={(e) => setWebImage(e.target.value)}
                  /> */}
                    {/* <FilePond
                    files={webImage}
                    onupdatefiles={setWebImage}
                    allowMultiple={true}
                    maxFiles={3}
                    name="files"
                    className="filepond filepond-input-multiple"
                  /> */}
                  </CardBody>
                </div>
                <div className="card">
                  <CardHeader>
                    <h4 className="card-title mb-0">
                      Feature Image for Mobile
                    </h4>
                  </CardHeader>

                  <CardBody>
                    <FilePond
                      files={mobImage}
                      onupdatefiles={setMobImage}
                      allowMultiple={false}
                      maxFiles={1}
                      name="mobImage"
                      className="multiple_filepond_custom filepond-input-multiple"
                    />
                  </CardBody>
                </div>
                <div className="card">
                  <CardHeader>
                    <h4 className="card-title mb-0">
                      Background Image for Mobile
                    </h4>
                  </CardHeader>

                  <CardBody>
                    <FilePond
                      files={bgImage}
                      onupdatefiles={setBgImage}
                      allowMultiple={false}
                      maxFiles={1}
                      name="bgImage"
                      className="multiple_filepond_custom filepond-input-multiple"
                    />
                  </CardBody>
                </div>

                {/* <div className="card">
                <CardBody>
                  <div className="card-header">
                    <h5 className="card-title mb-0">Image</h5>
                  </div>
                  <div>
                    <img className="add_category_img" alt="img" src={avatar3} />
                  </div>
                </CardBody>
              </div> */}
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddCategories;
