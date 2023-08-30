import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/anime";
import { Character } from "./pages/character";
import { Home } from "./pages/home";
import { NotFound } from "./components/NotFound";
import { Staff } from "./pages/staff";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/staff/:id" element={<Staff />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/manga/:id" element={<Manga />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
