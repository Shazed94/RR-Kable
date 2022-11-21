import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import axios from "axios";
import LoadingSpinner from "../../Component/LoadingSpinner";

const ProductHome = () => {
  // Fetch data from api
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [firstPage, setFirstPage] = useState([]);
  const [lastPage, setLastPage] = useState([]);

  const fetchProductData = () => {
    axios.get(`${BACKEND_BASE_URL}/api/product-master`).then((res) => {
      setAllProducts(res?.data?.products?.data);
      setCurrentPage(res.data?.products.current_page);
      setFirstPage(res.data?.products.from);
      setLastPage(res.data?.products.last_page);
    });
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const PaginateData = (num) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/product-master?page=${num}`)
      .then((res) => {
        setAllProducts(res?.data?.products?.data);
        setCurrentPage(res.data?.products.current_page);
      });
  };

  // ===========================Pagination ===================
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => PaginateData(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="sec1_card">
        <Card className="bg-dark text-white border-0 rounded-0 mb-4">
          <Card.Img
            style={{ maxHeight: "350px" }}
            src={require("../../Assets/Product-Image.png")}
            alt="Card_image"
          />
          <Card.ImgOverlay className="dark_layer">
            <Card.Title className="f_medium ">
              Make every connection more secure
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
      </div>

      <div className="sec1_description ">
        <p className="text-muted text_justify f_medium">
          This category includes all the wires and cables necessary for
          residential, commercial and public infrastructures. It includes cables
          as per IS 694 with FR, FR-LSH, HR FR properties. FIREX LS0H (Low smoke
          zero halogen) is a halogen-free single core cable specially designed
          as per BS EN 50525-3-41, to use in Auditoriums, Hospitals, Hotels,
          Schools, Stadiums, and all constructions for public usage where fire
          safety is utmost important. The category also includes LAN cables -
          RATNALAN CAT 5E/CAT 6, telephone cable RATNACOM and Co-X Cable for
          televisions - Ratna Co-X.
          <br />
          <br />
          Cables for Submersible motors with PVC as well as XLPE insulation are
          also available. Flexible CCTV Camera Cables with a tinned copper braid
          along with speaker cables for PA system as well as for domestic
          applications are available. EIB BUS cable as per KNX standard is
          available for home automation and BMS (Building Management system).
          Cables to international standards H07Z-R (6491B) to BS EN 50525-3-41,
          H07V-R (6491X) to BS EN 50525-2-31, 6181Y-BS 6004, 6181XY-BS 7889 are
          also available.
        </p>
      </div>

      <div className="sec4_pdShowcase my-5">
        <Row className="card_content">
          {allProducts.length == 0 ? (
            <div className="w-auto m-auto mt-5">
              <LoadingSpinner />
            </div>
          ) : (
            allProducts?.map((data, index) => (
              <Col md={4} sm={6} className="mb-3">
                <Card className="transition_ease_io">
                  <Card.Img
                    style={{ maxHeight: "300px" }}
                    variant="top"
                    src={`${BACKEND_BASE_URL}/${data?.image}`}
                  />
                  <Card.Footer className="text-center border-0 transition_ease_io">
                    <Link to={`details/${data?.slug}`} className="f_medium">
                      <p className="text-muted mb-0 f_bold">{data?.name}</p>
                      Read More <FaIcons.FaAngleDoubleRight className="ms-2" />
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
      <div className="custom_pagination d-flex justify-content-end flex-wrap">
        {lastPage !== firstPage && firstPage !== null && (
          <div className="mt-5 flex_center">
            <Pagination>{items}</Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHome;
