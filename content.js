chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "summarize_tos") {
      const tosElements = findTosElements();
      if (tosElements && tosElements.length > 0) {
        const tosText = extractTosText(tosElements);
        const summary = await fetchSummary(tosText);
        sendResponse({ summary: summary });
      } else {
        alert("No Terms of Service found on this page.");
      }
    }
    return true; // Required to handle asynchronous responses.
  });
  
  function findTosElements() {
    // ...
  }
  
  function extractTosText(tosElements) {
    // ...
  }
  
  async function fetchSummary(text) {
    // ...
  }
  