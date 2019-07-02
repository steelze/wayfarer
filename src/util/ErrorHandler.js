export default class ErrorHandler {
  static error(message, code) {
    const err = new Error(message);
    err.status = code;
    return err;
  }
}
