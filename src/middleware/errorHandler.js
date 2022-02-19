module.exports = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    // if (error instanceof CustomError){}
    if (process.env.NODE_ENV === "production") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json(error);
  }
  console.log(error);
  return res.status(500).json({
    error: "Error! Please try later",
  });
};
// next(new CustomError('xxxxxx'));
// class CustomError extends Error {
//   constructor(message){
//     super(message);
//   }
// }
