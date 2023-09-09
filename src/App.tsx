import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/anime";
import { Character } from "./pages/character";
import { AnimeHome } from "./pages/animeHome";
import { NotFound } from "./components/NotFound";
import { Staff } from "./pages/staff";
import { Search } from "./pages/search";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeHome />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/staff/:id" element={<Staff />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/manga/:id" element={<MangaHome />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
