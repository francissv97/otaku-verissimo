import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/Anime";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ViewAll } from "./pages/ViewAll";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<ViewAll param="trending" />} />
        <Route path="/this-season" element={<ViewAll param="this-season" />} />
        <Route path="/next-season" element={<ViewAll param="next-season" />} />
        <Route path="/popular" element={<ViewAll param="popular" />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
