import { HashRouter, Routes, Route } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import Home from "./Home";
import NotFound from "./NotFound";
import ProgressBars from "./ProgressBars";
import SvgIcons from "./SvgIcons";

function App() {
  return (
    <div>
      <HashRouter>
        <HamburgerMenu></HamburgerMenu>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/progress-bars`} element={<ProgressBars />} />
          <Route path={`/svg-icons`} element={<SvgIcons />} />
          <Route path={`/*`} element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
