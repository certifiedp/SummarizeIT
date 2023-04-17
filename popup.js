// you must obtain an OpenAI GPT-3 APIKey to use API
// You can obtain one here: https://platform.openai.com/account/api-keys
const apiKey = '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'; //paste it here

// Store question for GPT-3 and GPT-3's response.
const questionElement = document.getElementById('question');
const responseElement = document.getElementById('response');

function getWebsiteName(url) {
  // Remove "www." and ".com"
  let websiteName = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/.*$/, '');
  // Remove subdomains
  websiteName = websiteName.split('.').slice(-2, -1)[0];
  // Convert to uppercase
  websiteName = websiteName.charAt(0).toUpperCase() + websiteName.slice(1);
  return websiteName;
}

//API CONDITIONS
chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  responseElement.innerText = "I'm sorry, but this webpage is not a valid WWW address";
  
  const url = new URL(tabs[0].url).hostname;
  const domain = getWebsiteName(url);

  questionElement.innerText = `Please make bullet points summarizing ${domain}'s terms and services on its users`;
  responseElement.innerText = "Loading...";

  const prompt = `Give me bullet points of how ${domain} collects data about its users, and how the company uses it.`;
  const temperature = 0;
  const maxTokens = 250;

  const body = {
    prompt,
    temperature,
    max_tokens: maxTokens,
  };

  //API CALL
  try {
    const response = await fetch(`https://api.openai.com/v1/engines/davinci/completions?engine=davinci&prompt=${encodeURIComponent(prompt)}&temperature=${temperature}&max_tokens=${maxTokens}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    //GPT RESPONSE
    const data = await response.json();
    const answer = data.choices && data.choices.length > 0 ? data.choices[0].text.trim()+"..." : null;

    if (answer) {
      responseElement.innerText = answer;
    } else {
      responseElement.innerText = "Error: No answer received from API.";
    }

  } catch (error) {
    responseElement.innerText = `Error: ${error.message}`;
  }
});