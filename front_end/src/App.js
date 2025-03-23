import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routers from "./routes/Routers";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  // Define routes where Navbar should NOT be shown
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <div>
      <Navbar />
      <Routers />
      <Footer />
    </div>
  );
};

export default App;
