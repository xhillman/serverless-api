const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  FirstName: String,
  LastName: String,
  Phone: String,
});

const peopleModel = dynamoose.model('xh-people', peopleSchema);

exports.handler = async (event) => {
  let getKey = event.pathParameters.id;
  const response = {statusCode: null, body: null};
  try {
    let person = await peopleModel.get(getKey);
    response.statusCode = 200;
    response.body = JSON.stringify(person);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error.message);
  }
  return response;
};
