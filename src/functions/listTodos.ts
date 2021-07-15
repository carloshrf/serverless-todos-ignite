import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': user_id
    }
  }).promise()

  const todo = response.Items[0]

  console.log(response.Items)
  if (todo) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todos: response.Items
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'there is not any todo here...'
    })
  }
}