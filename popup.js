document.getElementById('summarize').addEventListener('click', async () => {
  const apiKey = 'your_openai_api_key';
  const text = await fetchTermsAndConditions();
  const summary = await summarizeText(apiKey, text);

  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML = '';
  summary.forEach(item => {
    const bullet = document.createElement('li');
    bullet.textContent = item;
    summaryDiv.appendChild(bullet);
  });
});

async function fetchTermsAndConditions() {
  // Add code to fetch terms and conditions from the current page
  // This can vary based on the website structure
  return 'Sample terms and conditions...';
}

async function summarizeText(apiKey, text) {
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = `Please provide a summary in bullet points of the following text:\n\n${text}\n\nSummary:\n`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.8
    })
  });

  const data = await response.json();

  if (response.ok) {
    if (data.choices && data.choices.length > 0 && data.choices[0].text) {
      const summary = data.choices[0].text.trim().split('\n');
      return summary.filter(line => line.startsWith('-')).map(line => line.substr(1).trim());
    } else {
      throw new Error('Failed to generate summary: No choices in response');
    }
  } else {
    throw new Error(`Failed to generate summary: ${data.error || 'Unknown error'}`);
  }
}


  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    const summary = data.choices[0].text.trim().split('\n-');
    summary.shift(); // Remove the first empty element
    return summary;
  } else {
    throw new Error('Failed to generate summary');
  }
