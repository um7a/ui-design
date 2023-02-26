import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import SvgIcons from "./SvgIcons";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/ui-design`} element={<Home />} />
        <Route path={`/ui-design/#/svg-icons`} element={<SvgIcons />} />
        <Route path={`/*`} element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
