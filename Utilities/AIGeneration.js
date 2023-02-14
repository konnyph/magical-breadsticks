const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
async function genText(response){
 await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${response}`,
  max_tokens: 7,
  temperature: 0,
})};

module.exports = genText