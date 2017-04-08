module.exports = (req, res, next) => {
  res.locals = {
    title: 'JumpJS'
  };
  next();
};
