import logo from "../../assets/logo.png";
import { ModeToggle } from "../../components/mode-toggle";
const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <div className="h-40 w-40">
          <img src={logo} alt="image" />
        </div>
        <ModeToggle />
      </nav>
    </div>
  );
};

export default Navbar;
