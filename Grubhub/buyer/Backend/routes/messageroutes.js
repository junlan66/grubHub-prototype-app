exports.textbox = function(req, res) {
  var content = req.query.messages;

  console.log("print once" + content);
  module.exports = { messages: content };
};
