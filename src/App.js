import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AwardRecognitions from "./Pages/AboutUs/AwardRecognitions";
import ManufacturingFacilities from "./Pages/AboutUs/ManufacturingFacilities";
import OurProfile from "./Pages/AboutUs/OurProfile";
import Policy from "./Pages/AboutUs/Policy";
import QualityAssurance from "./Pages/AboutUs/QualityAssurance";
import ResearchDevelopment from "./Pages/AboutUs/ResearchDevelopment";
import Admin from "./Pages/Admin/Admin";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import Carrer from "./Pages/Carrer/Carrer";
import SubmitCv from "./Pages/Carrer/SubmitCv";
import Home from "./Pages/Home/Home";
import Blog from "./Pages/Media/Blog";
import Download from "./Pages/Media/Download";
import Events from "./Pages/Media/Events";
import Media from "./Pages/Media/Media";
import News from "./Pages/Media/News/News";
import Videos from "./Pages/Media/Videos";
import Product from "./Pages/Products/Product";
import Report from "./Pages/Report";
import KabelConnect from "./Pages/Wired/KabelConnect/KabelConnect";
import KableCalculator from "./Pages/Wired/KableCalculator/KableCalculator";
import PriceList from "./Pages/Wired/PriceList/PriceList";
import Wired from "./Pages/Wired/Wired";
import ScrollToTop from "./Utils/ScrollToTop/ScrollToTop";

import AdminPrivateRoute from "./Component/PrivateRoute/AdminPrivateRoute";
import AdminLoginForm from "./Pages/Admin/AdminLogin";
import AddSlider from "./Pages/Admin/Slider/AddSlider";
import AllSlider from "./Pages/Admin/Slider/AllSlider";
import EditSlider from "./Pages/Admin/Slider/EditSlider";
import AllNews from "./Pages/Admin/News/AllNews";
import AddNews from "./Pages/Admin/News/AddNews";
import EditNews from "./Pages/Admin/News/EditNews";
import AddBlogs from "./Pages/Admin/Blogs/AddBlogs";
import AllBlogs from "./Pages/Admin/Blogs/AllBlogs";
import EditBlogs from "./Pages/Admin/Blogs/EditBlogs";
import AddEvent from "./Pages/Admin/Events/AddEvent";
import AllEvents from "./Pages/Admin/Events/AllEvents";
import EditEvent from "./Pages/Admin/Events/EditEvent";
import AddVideo from "./Pages/Admin/Videos/AddVideo";
import AllVideos from "./Pages/Admin/Videos/AllVideos";
import EditVideo from "./Pages/Admin/Videos/EditVideo";
import NewsDetails from "./Pages/Media/NewsDetails";
import EventDetails from "./Pages/Media/EventDetails";
import BlogDetails from "./Pages/Media/BlogDetails";

import ProductCategories from "./Pages/Admin/ProductCategories";
import AddProduct from "./Pages/Admin/Admin-Products/AddProduct";

import AllProduct from "./Pages/Admin/Admin-Products/AllProduct";
import EditProduct from "./Pages/Admin/Admin-Products/EditProduct";
import ViewProduct from "./Pages/Admin/Admin-Products/ViewProduct";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Factory from "./Pages/ContactUs/Factory";
import RegionalOffice from "./Pages/ContactUs/RegionalOffice";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ProductHome from "./Pages/Products/ProductHome";
import ProductDetails from "./Pages/Products/ProductDetails";
import TableProductDesign from "./Pages/Admin/Product-Table-Design/TableProductDesign";
import AddTableProductDesign from "./Pages/Admin/Product-Table-Design/AddTableProductDesign";
import EditTableProductDesign from "./Pages/Admin/Product-Table-Design/EditTableProductDesign";
import AllContacts from "./Pages/Admin/Admin-Contact/AllContact";
import ViewContact from "./Pages/Admin/Admin-Contact/ViewContact";
import AllCareers from "./Pages/Admin/Admin-Career/AllCareers";
import ViewCareer from "./Pages/Admin/Admin-Career/ViewCareer";
import AddRegionalOffice from "./Pages/Admin/RegionalOffices/AddRegionalOffice";
import AllRegionalOffice from "./Pages/Admin/RegionalOffices/AllRegionalOffice";
import EditRegionalOffice from "./Pages/Admin/RegionalOffices/EditRegionalOffice";
import Brochure from "./Pages/Admin/Brochure";
import Mission from "./Pages/AboutUs/Mission";
import Vision from "./Pages/AboutUs/Vision";
import Award from "./Pages/Award";
import CurrentOpenings from "./Pages/Carrer/CurrentOpenings";

function App() {
  return (
    <Router>
      <Helmet>
        <title>
          RR Kabel | Leading Wire &amp; Cable Manufacturer Company in Bangladesh
        </title>
        <meta
          name="description"
          content="Get all types of wires and cables from India's leading cable company, RR Kabel. Know more."
        />
      </Helmet>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-brand" element={<Navigate to="/" />} />
        <Route path="*" element={<Home />} />

        <Route path="/maintenance" element={<Report />} />
        <Route path="/award-certificate" element={<Award />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />

        <Route path="/who-we-are" element={<AboutUs />}>
          <Route path="/who-we-are" element={<Navigate to="our-profile" />} />
          <Route path="our-profile" element={<OurProfile />} />
          <Route path="mission" element={<Mission />} />
          <Route path="vision" element={<Vision />} />
          {/* <Route
            path="research-development"
            element={<ResearchDevelopment />}
          /> */}
          {/* <Route path="award-Recognitions" element={<AwardRecognitions />} /> */}
          <Route path="policy" element={<Policy />} />
          {/* <Route
            path="manufacturing-facilities"
            element={<ManufacturingFacilities />}
          /> */}
          {/* <Route path="quality-assurance" element={<QualityAssurance />} /> */}
        </Route>

        <Route path="media" element={<Media />}>
          <Route path="/media" element={<Navigate to="news" />} />
          <Route path="blog" element={<Blog />} />
          <Route path="news" element={<News />} />
          <Route path="download" element={<Download />} />
          <Route path="events" element={<Events />} />
          <Route path="video" element={<Videos />} />

          <Route path="news/:newsId" element={<NewsDetails />} />
          <Route path="events/:eventId" element={<EventDetails />} />
          <Route path="blog/:blogId" element={<BlogDetails />} />
        </Route>

        <Route path="wired" element={<Wired />}>
          <Route path="/wired" element={<Navigate to="pricelist" />} />
          <Route path="pricelist" element={<PriceList />} />
          <Route path="calculator" element={<KableCalculator />} />
          {/* <Route path="kableconnect" element={<KabelConnect />} /> */}
        </Route>

        <Route path="career" element={<Carrer />}>
          <Route path="/career" element={<Navigate to="submitcv" />} />
          <Route path="submitcv" element={<SubmitCv />} />
          <Route path="current-opening" element={<CurrentOpenings />} />
        </Route>

        <Route path="product" element={<Product />}>
          <Route index element={<ProductHome />} />
          <Route path="details/:productSlug" element={<ProductDetails />} />
        </Route>

        
        <Route path="contact-us" element={<Outlet />}>
          <Route
            path="/contact-us"
            element={<Navigate to="head-office" />}
          />
          <Route path="head-office" element={<ContactUs />} />
          <Route path="factory-office" element={<Factory />} />
          <Route path="regional-office" element={<RegionalOffice />} />
        </Route>

  

        {/*===================== Admin Dashboard ===========================*/}
        <Route
          path="admin"
          element={
            <AdminPrivateRoute>
              <Admin />{" "}
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="sliders" element={<AllSlider />} />
          <Route path="sliders/add-new" element={<AddSlider />} />
          <Route path="sliders/edit/:bannerId" element={<EditSlider />} />

          <Route path="products/categories" element={<ProductCategories />} />

          <Route path="products" element={<AllProduct />} />
          <Route path="products/add-new" element={<AddProduct />} />
          <Route path="products/edit/:productId" element={<EditProduct />} />
          <Route path="products/view/:productId" element={<ViewProduct />} />

          <Route
            path="products/table-design"
            element={<TableProductDesign />}
          />
          <Route
            path="products/table-design/add-new"
            element={<AddTableProductDesign />}
          />
          <Route
            path="products/table-design/edit/:tableDesignId"
            element={<EditTableProductDesign />}
          />

          {/* <Route path="sliders/edit/:bannerId" element={<EditSlider />} />  */}

          <Route path="news" element={<AllNews />} />
          <Route path="news/add-new" element={<AddNews />} />
          <Route path="news/edit/:newsId" element={<EditNews />} />

          <Route path="blogs" element={<AllBlogs />} />
          <Route path="blogs/add-new" element={<AddBlogs />} />
          <Route path="blogs/edit/:blogId" element={<EditBlogs />} />

          <Route path="events" element={<AllEvents />} />
          <Route path="events/add-new" element={<AddEvent />} />
          <Route path="events/edit/:eventId" element={<EditEvent />} />

          <Route path="videos" element={<AllVideos />} />
          <Route path="videos/add-new" element={<AddVideo />} />
          <Route path="videos/edit/:videoId" element={<EditVideo />} />

          <Route path="contact" element={<AllContacts />} />
          <Route path="contact/view/:contactId" element={<ViewContact />} />

          <Route path="career" element={<AllCareers />} />
          <Route path="career/view/:careerId" element={<ViewCareer />} />

          <Route path="all-offices" element={<AllRegionalOffice />} />
          <Route path="all-offices/add-new" element={<AddRegionalOffice />} />
          <Route
            path="all-offices/edit/:officeId"
            element={<EditRegionalOffice />}
          />

          <Route path="download-user" element={<Brochure />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
