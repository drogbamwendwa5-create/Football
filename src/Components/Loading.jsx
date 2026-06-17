function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>{message}</p>
    </div>
  );
}

export default Loading;