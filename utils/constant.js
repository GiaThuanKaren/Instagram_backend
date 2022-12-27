const MSG = function (msg, others = null, data = null) {
  return {
    msg,
    others,
    data,
  };
};

module.exports = MSG;
