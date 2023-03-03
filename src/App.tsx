import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/Anime";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/trending" element={<ViewAll />} />
        <Route path="/this-season" element={<ViewAll />} />
        <Route path="/next-season" element={<ViewAll />} />
        <Route path="/popular" element={<ViewAll />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
