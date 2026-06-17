import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import LeagueStandings from "./Pages/LeagueStandings";
import Teams from "./Pages/Teams";
import TeamDetails from "./Pages/TeamDetails";
import MatchCenter from "./Pages/MatchCenter";
import Comparison from "./Pages/Comparison";
import Predictions from "./Pages/Predictions";
import Statistics from "./Pages/Statistics";
import Search from "./Pages/Search";
import About from "./Pages/About";

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
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
          <Footer />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;