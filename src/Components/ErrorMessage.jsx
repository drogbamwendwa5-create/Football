function ErrorMessage({ message = "An error occurred. Please try again later." }) {
  return (
    <div className="error-message">
      <span>&#9888;</span>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;