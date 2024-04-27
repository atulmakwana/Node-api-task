class ObjectNotFoundError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ObjectNotFoundError);
      }
  
      this.name = 'ObjectNotFound';
      this.httpStatusCode=404;
    }
  }
  module.exports=ObjectNotFoundError;
  