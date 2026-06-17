function About() {
  return (
    <div className="main-container">
      <div className="page-header">
        <h1>About Football Intelligence</h1>
        <p>Learn more about this football analytics platform.</p>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>What is Football Intelligence?</h3>
          <p>Football Intelligence is a comprehensive football analytics platform that provides real-time standings, team information, match details, and statistical insights for top European football leagues.</p>
        </div>
        <div className="card">
          <h3>Features</h3>
          <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", lineHeight: 2 }}>
            <li>Live league standings for 5 top European leagues</li>
            <li>Detailed team profiles and statistics</li>
            <li>Match center with scores and fixtures</li>
            <li>Team comparison tools</li>
            <li>AI-powered match predictions</li>
            <li>Interactive charts and visualizations</li>
          </ul>
        </div>
        <div className="card">
          <h3>Data Source</h3>
          <p>All data is provided by the football-data.org API. We use the free tier which provides comprehensive coverage of major European football competitions.</p>
        </div>
        <div className="card">
          <h3>Technology Stack</h3>
          <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", lineHeight: 2 }}>
            <li>React 19 with React Router</li>
            <li>Vite for build tooling</li>
            <li>Recharts for data visualization</li>
            <li>Axios for API requests</li>
            <li>Framer Motion for animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;