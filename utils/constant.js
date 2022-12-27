const MSG = function (msg, others = null, data = null,status="OK") {
  return {
    msg,
    others,
    data,
    status
  };
};

module.exports = MSG;
