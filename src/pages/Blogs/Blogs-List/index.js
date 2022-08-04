import React, { useEffect, useState, useMemo } from "react";
import MetaTags from "react-meta-tags";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
  Input,
} from "reactstrap";
import classnames from "classnames";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
// import { Rating, Published, Price } from "./EcommerceProductCol";
//Import data
import { productsData } from "../../../common/data";

//Import actions
import { getProducts as onGetProducts } from "../../../store/ecommerce/action";
import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ResourceStore } from "i18next";

const SingleOptions = [
  { value: "Watches", label: "Watches" },
  { value: "Headset", label: "Headset" },
  { value: "Sweatshirt", label: "Sweatshirt" },
  { value: "20% off", label: "20% off" },
  { value: "4 star", label: "4 star" },
];

// main functioin
const BlogList = (props) => {
  const [apiData, setApiData] = useState("");

  const dispatch = useDispatch();
  const { products, CategoriesReducerGet } = useSelector((state) => ({
    products: state.Ecommerce.products,
    CategoriesReducerGet: state.CategoriesReducerGet,
  }));

  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedMulti, setselectedMulti] = useState(null);

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  // api get
  useEffect(() => {
    GetDashboardData();
  }, []);

  const GetDashboardData = () => {
    fetch("http://localhost:3000/api/blogs/").then((result) => {
      result.json().then((response) => {
        setApiData(response.data);
      });
    });
  };

  // api delete
  const DeleteUser = (_id) => {
    fetch(`http://localhost:3000/api/blogs/${_id}/`, {
      method: "DELETE",
    })
      .then((result) => {
        result.json().then((response) => {
          console.log("deleted data => ", response);
          GetDashboardData();
        });
      })
      .catch((err) => console.log(err));
  };

  console.log("fetch data ==>", apiData);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = productsData;
      if (type !== "all") {
        filteredProducts = productsData.filter(
          (product) => product.type === type
        );
      }
      setProductList(filteredProducts);
    }
  };

  const onUpdate = (render, handle, value) => {
    setProductList(
      productsData.filter(
        (product) => product.price >= value[0] && product.price <= value[1]
      )
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        Cell: (data) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-dark"
                  >
                    {data.row.original.image}
                  </Link>
                </h5>
              </div>
            </div>
          </>
        ),
      },

      {
        Header: "Category",
        Cell: (data) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-dark"
                  >
                    {data.row.original.Category}
                  </Link>
                </h5>
              </div>
            </div>
          </>
        ),
      },

      {
        Header: "Title",
        Cell: (data) => (
          <>
            {/* {console.log("I got category ", category)} */}

            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-dark"
                  >
                    {data.row.original.Title}
                  </Link>
                </h5>
              </div>
            </div>
          </>
        ),
      },

      {
        Header: "Action",
        Cell: (data) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>
                  <Link to={`blogs-edit-blog/${data.row.original._id}`}>
                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                    Edit
                  </Link>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  data-bs-toggle="modal"
                  data-bs-target="#removeItemModal"
                >
                  <Link
                    onClick={() => {
                      DeleteUser(data.row.original._id);
                    }}
                  >
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                    Delete
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Products | Velzon - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Positions List" pageTitle="Positions" />

          <Row>
            <div className="col-xl-12 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row g-4">
                      <div className="col-sm-auto">
                        <div>
                          <Link
                            to={`blogs-add-blog`}
                            className="btn btn-success"
                          >
                            {" "}
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Blogs
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Category..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-header">
                    <div className="row align-items-center"></div>
                  </div>

                  <div className="card-body">
                    <TabContent className="text-muted">
                      <TabPane>
                        <div
                          id="table-product-list-all"
                          className="table-card gridjs-border-none pb-2"
                        >
                          {apiData && apiData !== "" ? (
                            <TableContainer
                              columns={columns}
                              data={apiData}
                              isGlobalFilter={false}
                              isAddUserList={false}
                              customPageSize={10}
                              divClass="table-responsive mb-1"
                              tableClass="mb-0 table-borderless"
                              theadClass="table-light text-muted"
                            />
                          ) : (
                            <div className="py-4 text-center">
                              <div>
                                <lord-icon
                                  src="https://cdn.lordicon.com/msoeawqm.json"
                                  trigger="loop"
                                  colors="primary:#405189,secondary:#0ab39c"
                                  style={{ width: "72px", height: "72px" }}
                                ></lord-icon>
                              </div>

                              <div className="mt-4">
                                <h5>Sorry! No Result Found</h5>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogList;
