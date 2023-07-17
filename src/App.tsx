import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/Anime";
import { Character } from "./pages/Character";
import { Home } from "./pages/Home";
import { NotFound } from "./components/NotFound";
import { Staff } from "./pages/Staff";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id/:sub?" element={<Anime />} />
        {/* <Route path="/manga/:id" element={<Manga />} /> */}
        <Route path="/staff/:id" element={<Staff />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
