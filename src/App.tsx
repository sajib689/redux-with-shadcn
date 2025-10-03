import { Outlet } from "react-router";
import Navbar from "./file/shared/Navbar";
import Footer from "./file/shared/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
