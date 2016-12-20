## AWS Lambda

AWS Lambda integration for Meteor Apps.

## Installation

```bash
meteor add nodexpert:aws-lambda
```

## Docs

AWS-Lambda package let you use all features of AWS's Lambda SDK with no to little configuration required. You can create, delete or invoke your lambda function using this package from your Meteor application. However, you need to set up few files before using this package which are mentioned in next section.

## Prerequisites

You have to set up AWS in your system first. There are many ways to set up AWS SDK in your project but we're going with the easiest one here but you are free to use any other. All methods are on AWS's official [documentation](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html).   
We suggest you create a shared credentials file with the following text.

```bash
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

The SDK for JavaScript automatically searches the shared credentials file for credentials when loading. Where you keep the shared credentials file depends on your operating system:

- Linux users: ~/.aws/credentials
- Windows users: C:\Users\USER_NAME\.aws\credentials

For more deatils refer [this](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html) documentation.

We suggested this method because once created, this file will be used by AWS's SDK for every project.

Next, you need to create a settings file in your Meteor app. If you don't have one or don't know how to create it, please follow [this](https://blog.meteor.com/the-meteor-chef-making-use-of-settings-json-3ed5be2d0bad#.t99sf9yso) amazing guide.

Once you have created this, you can add following content in your settings file,

```bash
"AWS" : {
  "region": "<YOUR_REGION>"
}
```
If you don't provide this object in your settings then this package will throw an error on the server and stops the rest of flow.

That's it, now you're ready to use every function of AWS Lambda SDK.

## Usage

- Create a Lambda Function

For this you need code of Lambda function saved in AWS S3 bucket or you can create a function from their dashboard too.

```bash
const params = {
    Code: { /* required */
      S3Bucket: 'STRING_VALUE',
      S3Key: 'STRING_VALUE',
      S3ObjectVersion: 'STRING_VALUE',
      ZipFile: new Buffer('...') || 'STRING_VALUE'
    },
    FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>' /* required */
    Handler: 'STRING_VALUE', /* required */
    Role: 'STRING_VALUE', /* required */
    Runtime: 'nodejs | nodejs4.3 | java8 | python2.7 | dotnetcore1.0 | nodejs4.3-edge', /* required */
    DeadLetterConfig: {
      TargetArn: 'STRING_VALUE'
    },
    Description: 'STRING_VALUE',
    Environment: {
      Variables: {
        someKey: 'STRING_VALUE',
        /* anotherKey: ... */
      }
    },
    KMSKeyArn: 'STRING_VALUE',
    MemorySize: 0,
    Publish: true || false,
    Timeout: 0,
    VpcConfig: {
      SecurityGroupIds: [
        'STRING_VALUE',
        /* more items */
      ],
      SubnetIds: [
        'STRING_VALUE',
        /* more items */
      ]
    }
};

AWSLambda.createFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- Get a Lambda Function

```bash
const params = {
    FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
    Qualifier: '<OUALIFIER_NAME>'
};

AWSLambda.getFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- Invoke a Lambda Function

```bash
const params = {
    FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(<EVENT_OBJECT>)
};

AWSLambda.invoke(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- Delete a Lambda FunctionName

```bash
const params = {
  FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
  Qualifier: '<AWS_LAMBDA_QUALIFIER_NAME>'
};

AWSLambda.deleteFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```


- Create an alias

```bash
const params = {
  FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
  FunctionVersion: '<AWS_LAMBDA_FUNCTION_VERSION>', /* required */
  Name: '<AWS_LAMBDA_ALIAS_NAME>', /* required */
  Description: '<AWS_LAMBDA_ALIAS_DESC>'
};

AWSLambda.createAlias(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- Get an alias

```bash
const params = {
  FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
  Name: '<AWS_LAMBDA_ALIAS_NAME>' /* required */
};

AWSLambda.getAlias(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- Delete an alias

```bash
const params = {
  FunctionName: '<AWS_LAMBDA_FUNCTION_NAME>', /* required */
  Name: '<AWS_LAMBDA_ALIAS_NAME>' /* required */
};

AWSLambda.deleteAlias(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```
