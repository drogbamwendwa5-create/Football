import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";

// Lazy-loaded pages
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const LeagueStandings = lazy(() => import("./Pages/LeagueStandings"));
const Teams = lazy(() => import("./Pages/Teams"));
const TeamDetails = lazy(() => import("./Pages/TeamDetails"));
const MatchCenter = lazy(() => import("./Pages/MatchCenter"));
const Comparison = lazy(() => import("./Pages/Comparison"));
const Predictions = lazy(() => import("./Pages/Predictions"));
const Statistics = lazy(() => import("./Pages/Statistics"));
const Search = lazy(() => import("./Pages/Search"));
const About = lazy(() => import("./Pages/About"));

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/standings" element={<LeagueStandings />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/team/:id" element={<TeamDetails />} />
              <Route path="/matches" element={<MatchCenter />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;