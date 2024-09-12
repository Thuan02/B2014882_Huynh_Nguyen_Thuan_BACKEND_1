class ApiError extends Error {
  constuctor(statusCode, message) {
    super();
    this.statusCode = statusCode;
  }
}
