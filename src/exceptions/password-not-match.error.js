class PasswordNotMatchError extends Error {
    constructor(...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, PasswordNotMatchError);
      }
  
      this.name = 'PasswordNotMatchError';
      this.httpStatusCode=403;
    }
  }
  module.exports=PasswordNotMatchError;
  