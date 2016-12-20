Package.describe({
  name: 'nodexpert:aws-lambda',
  version: '1.0.0',
  summary: 'AWS Lambda integration for Meteor Apps',
  git: 'https://github.com/nodexpertsdev/aws-lambda',
  documentation: 'README.md'
});

Npm.depends({
  'aws-sdk': '2.7.15'
});

Package.onUse(function(api){

  api.versionsFrom('1.0');

  api.use(['ecmascript@0.6.1']);

  api.addFiles([
    'aws-lambda.js',
    'config-msg.js'
  ], 'server');

});
