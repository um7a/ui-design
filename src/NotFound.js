import "./NotFound.css";

function NotFound() {
  return (
    <div className="NotFound">
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
