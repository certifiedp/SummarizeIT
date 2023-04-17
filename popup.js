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
  const prompt = `Summarize the following text in bullet points:\n\n${text}\n\nSummary:\n-`;

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
  const summary = data.choices[0].text.trim }
