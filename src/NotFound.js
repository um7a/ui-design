import "./NotFound.css";
import HamburgerMenu from "./HamburgerMenu";

function NotFound() {
  return (
    <div className="NotFound">
      <HamburgerMenu></HamburgerMenu>
      <div className="Main">
        <div className="StatusCode">
          <p>404</p>
        </div>
        <div className="DescriptionSpace">
          <p>Oops. The requested page doesn't exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
