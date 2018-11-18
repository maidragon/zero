module.exports = {
  messageType: {
    ASK_FOR_CODE_PHASES: 0,
    GOT_CODE_PHASES: 1,
    QUERY_CODE_PHASES: 2,
    READY_TO_SEND: 3,
    SENDING_FILE: 4,
  },
  generateMessage(messageObject) {
    return JSON.stringify(messageObject);
  }
}