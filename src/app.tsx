import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anime } from "./pages/anime";
import { Character } from "./pages/character";
import { Home } from "./pages/home";
import { Staff } from "./pages/staff";
import { Search } from "./pages/search";
import { AnimeList } from "./pages/anime-list";
import { Profile } from "./pages/profile";
import { useViewer } from "./hooks/use-viewer";
import { useAuth } from "./hooks/use-auth";
import { NotFound } from "./components/not-found";
import { RequireAuth } from "./auth/require-auth";

export function App() {
  const { signin } = useAuth();

  async function checkViewerDataIfNeeded() {
    const { refreshViewerDataIfNeeded } = useViewer();

    const viewer = await refreshViewerDataIfNeeded();

    if (viewer) {
      signin(viewer);
    } else {
      signin(null);
    }
  }

  useEffect(() => {
    checkViewerDataIfNeeded();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/staff/:id" element={<Staff />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/animelist"
          element={
            <RequireAuth>
              <AnimeList />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
