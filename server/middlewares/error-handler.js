
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Somthing went wrong in the server!",
  }

  if(err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = `Please provide valide ${Object.keys(err.errors)
      .map(field => field).join(', ')}!`;
  }

  if(err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `${Object.keys(err.keyValue)[0]} '${Object.values(err.keyValue)[0]}' already exist!`;
  }

  if(err.name === 'CastError') {
    customError.statusCode = 400;
    customError.message = 'ID syntax is not correct: Provide a valide ID please!';
  }

  // res.status(customError.statusCode)
  // .json({ success: false, error: err });
  res.status(customError.statusCode)
  .json({ success: false, message: customError.message });
}

module.exports = errorHandler