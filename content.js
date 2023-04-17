chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize_tos") {
    const tosElements = findTosElements();
    if (tosElements.length > 0) {
      const tosText = extractTosText(tosElements);

      chrome.runtime.sendMessage(
        { action: "fetch_summary", text: tosText },
        (response) => {
          if (response && response.summary) {
            chrome.runtime.sendMessage({
              action: "display_summary",
              summary: response.summary,
            });
          }
        }
      );
    } else {
      alert("No Terms of Service found on this page.");
    }
  }
});

function findTosElements() {
  const keywords = ["terms of service", "terms and conditions"];
  const allElements = Array.from(document.querySelectorAll("body *"));
  const tosElements = [];

  allElements.forEach((element) => {
    const textContent = element.textContent.toLowerCase();

    keywords.forEach((keyword) => {
      if (textContent.includes(keyword)) {
        tosElements.push(element);
      }
    });
  });

  return tosElements;
}

function extractTosText(tosElements) {
  return tosElements
    .map((element) => element.textContent)
    .join("\n\n")
    .trim();
}
