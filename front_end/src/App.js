import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routers from "./routes/Routers";

const App = () => {
  const location = useLocation();

  // Define routes where Navbar should NOT be shown
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <div>
      <Navbar />
      <Routers />
    </div>
  );
};

export default App;
