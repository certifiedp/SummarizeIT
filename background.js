chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetch_summary") {
    fetchSummary(request.text).then((summary) => {
      sendResponse({ summary: summary });
    });
    return true;
  }
});

async function fetchSummary(text) {
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${YOUR_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Summarize the following terms of service and list the main points:\n\n${text}\n\nSummary:`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.8,
    })
  });

  const data = await response
