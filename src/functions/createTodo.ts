import { document } from 'src/utils/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';

interface ITodoCreate {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {

  const { title, deadline } = JSON.parse(event.body) as ITodoCreate;
  const { id: user_id } = event.pathParameters;

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Created!'
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}