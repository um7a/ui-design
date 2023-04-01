import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import SvgIcons from "./SvgIcons";
import ProgressBars from "./ProgressBars";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/svg-icons`} element={<SvgIcons />} />
        <Route path={`/progress-bars`} element={<ProgressBars />} />
        <Route path={`/*`} element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
