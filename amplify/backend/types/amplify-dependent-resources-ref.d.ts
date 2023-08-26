export type AmplifyDependentResourcesAttributes = {
  "api": {
    "payment": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "rightcliqfinal": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "rightcliqfinalee8bbe01": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "AdminGroupRole": "string",
      "CreatorGroupRole": "string"
    }
  },
  "function": {
    "razorpaypayment": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "storagefinal": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}