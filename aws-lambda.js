let configMsg = require('./config-msg.js');
let AWS = require('aws-sdk');

if (typeof Meteor.settings.AWS === 'undefined') {
  throw new Meteor.Error(configMsg.errorId, configMsg.errorMsgAWSMissing);
}

if (typeof Meteor.settings.AWS.region === 'undefined') {
  throw new Meteor.Error(configMsg.errorId, configMsg.errorMsgRegionMissing);
}

AWS.config.update({
  region: Meteor.settings.AWS.region
});

this.AWSLambda = new AWS.Lambda();
