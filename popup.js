const generateButton = document.getElementById('generate');
const inputText = document.getElementById('input-text');
const outputDiv = document.getElementById('output');

generateButton.addEventListener('click', async () => {
  const text = inputText.value;
  if (text) {
    const response = await fetchOpenAI(text);
    outputDiv.textContent = response.choices[0].text;
  }
});

async function fetchOpenAI(promptText) {
  const apiKey = await getAPIKey();
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const data = {
    prompt: promptText,
    max_tokens: 50,
    n: 1,
    stop: null,
    temperature: 0.7,
  };

  const response = await fetch(url, {
    method
