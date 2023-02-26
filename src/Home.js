import "./Home.css";
import HamburgerMenu from "./HamburgerMenu";

function Home() {
  return (
    <div className="Home">
      <HamburgerMenu></HamburgerMenu>

      <div className="Main">
        <div className="TitleSpace">
          <p>UI Design Repository</p>
        </div>
        <div className="DescriptionSpace">
          <p>
            This page is for testing the sample code related to UI Design
            created by um7a.
            <br />
            The source code is available at{" "}
            <a href="https://github.com/um7a/ui-design">
              https://github.com/um7a/ui-design
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
