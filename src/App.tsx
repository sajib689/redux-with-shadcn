import { Outlet } from "react-router";
import Navbar from "./file/shared/Navbar";
import Footer from "./file/shared/Footer";

function App() {
  return (
    <div className="max-w-7xl mx-auto mt-2">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
