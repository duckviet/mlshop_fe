export class AuthRequiredError extends Error {
  constructor(message = "Auth is require for this page") {
    super(message);
    this.name = "AuthRequiredError";
  }
}
