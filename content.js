chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize_tos") {
      const tosElement = document.querySelector("YOUR_TOS_SELECTOR"); // Replace "YOUR_TOS_SELECTOR" with a suitable selector for the target website
      if (tosElement) {
        const tosText = tosElement.textContent;
  
        chrome.runtime.sendMessage(
          { action: "fetch_summary", text: tosText },
          (response) => {
            chrome.runtime.sendMessage({
              action: "display_summary",
              summary: response.summary,
            });
          }
        );
      } else {
        alert("No Terms of Service found on this page.");
      }
    }
  });
  