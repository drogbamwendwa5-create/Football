// Updated imports with lazy loading


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