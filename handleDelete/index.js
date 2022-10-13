const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  FirstName: String,
  LastName: String,
  Phone: String,
});

const peopleModel = dynamoose.model('xh-people', peopleSchema);

exports.handler = async (event) => {
  let deleteKey = event.pathParameters.id;
  const response = {statusCode: null, body: null};
  try {
    await peopleModel.delete(deleteKey);
    response.statusCode = 200;
    response.body = JSON.stringify(`Database ID: ${deleteKey} was deleted!`);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error.message);
  }
  return response;
};
