const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  FirstName: String,
  LastName: String,
  Phone: String,
});

const peopleModel = dynamoose.model('xh-people', peopleSchema);

exports.handler = async (event) => {
  let stringifiedBody = event.body.toString();
  let parsedBody = JSON.parse(stringifiedBody);
  let {id, FirstName, LastName, Phone} = parsedBody;
  let person = {
    id,
    FirstName,
    LastName,
    Phone,
  };
  const response = {statusCode: null, body: null};
  try {
    let newPerson = await peopleModel.create(person);
    response.statusCode = 200;
    response.body = JSON.stringify(newPerson);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error.message);
  }
  return response;
};
