class ObjectALreadyExistError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ObjectALreadyExistError);
      }
  
      this.name = 'ObjectALreadyExistError';
      this.httpStatusCode=409;
    }
  }
  module.exports=ObjectALreadyExistError;