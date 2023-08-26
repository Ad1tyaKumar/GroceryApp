const sendToken = (user, statusCode, res) => {
  //Generating JWTTOKEN
  const token = user.getJWTToken();
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
export default sendToken;
