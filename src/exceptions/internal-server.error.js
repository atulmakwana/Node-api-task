class InternalServerError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InternalServerError);
      }
  
      this.name = 'InternalServerError';
      this.httpStatusCode=500;
    }
  }
  module.exports=InternalServerError;