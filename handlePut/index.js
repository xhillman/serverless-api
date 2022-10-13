const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  FirstName: String,
  LastName: String,
  Phone: String,
});

const peopleModel = dynamoose.model('xh-people', peopleSchema);

exports.handler = async (event) => {
  let updateKey = event.pathParameters.id;
  let stringifiedBody = event.body.toString();
  let parsedBody = JSON.parse(stringifiedBody);
  let bodyKeys = Object.keys(parsedBody);
  let bodyValues = Object.values(parsedBody);
  let personToUpdate = {id: updateKey};
  bodyKeys.forEach((key, idx) => {
    personToUpdate[key] = bodyValues[idx];
  });
  const response = {statusCode: null, body: null};
  try {
    let updatedPerson = await peopleModel.update(personToUpdate);
    response.statusCode = 200;
    response.body = JSON.stringify(updatedPerson);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error.message);
  }
  return response;
};
