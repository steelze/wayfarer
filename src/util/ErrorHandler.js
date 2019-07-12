const errorHandler = (message, code) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

export default errorHandler;
