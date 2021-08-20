class ErrorApp {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 404) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ErrorApp;
