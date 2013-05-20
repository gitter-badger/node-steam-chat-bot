var util = require('util');

var BaseTrigger = require('./baseTrigger.js').BaseTrigger;

/*
Accepts chat invites for whitelisted servers and says an optional message after joining.
Relevant options are:
chatrooms = {"roomId1": "message1", "roomId1": "message1"} - list of rooms to join and their welcome message (can be null)
*/

var AcceptChatInviteTrigger = function() {
	AcceptChatInviteTrigger.super_.call(this);
};

util.inherits(AcceptChatInviteTrigger, BaseTrigger);

AcceptChatInviteTrigger.prototype._respondToChatInvite = function(roomId, roomName, inviterId) {
    console.log(['_respondToChatInvite', roomId, roomName, inviterId, this.options]);

    if (roomId in this.options.chatrooms) {
        this.chatBot.joinChat(roomId);
        var welcomeMsg = this.options.chatrooms[roomId];
        if (welcomeMsg) {
        	this._sendMessageAfterDelay(roomId, welcomeMsg);
        }
        return true;
    }
    return false;
}

exports.AcceptChatInviteTrigger = AcceptChatInviteTrigger;
exports.triggerName = "AcceptChatInviteTrigger";
exports.create = function(name, chatBot, options) {
	var trigger = new AcceptChatInviteTrigger();
	trigger.init(name, chatBot, options);
	return trigger;
};