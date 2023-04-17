document.getElementById("summarize").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "summarize_tos" });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "display_summary") {
    const summaryList = document.getElementById("summary");
    summaryList.innerHTML = "";

    request.summary.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      summaryList.appendChild(li);
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarize");
  if (summarizeButton) {
    summarizeButton.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "summarize_tos" });
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "display_summary") {
    const summaryList = document.getElementById("summary");
    summaryList.innerHTML = "";

    request.summary.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      summaryList.appendChild(li);
    });
  }
});
