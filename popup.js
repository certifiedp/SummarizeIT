document.getElementById("summarize").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "summarize_tos" }, (response) => {
      if (response && response.summary) {
        const summaryList = document.getElementById("summary");
        summaryList.innerHTML = "";

        response.summary.forEach((point) => {
          const li = document.createElement("li");
          li.textContent = point;
          summaryList.appendChild(li);
        });
      }
    });
  });
});
