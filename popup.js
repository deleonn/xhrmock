// Load settings when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(
        ["urlToMock", "redirect", "mockEnabled"],
        function(data) {
            if (data.urlToMock) {
                document.getElementById("urlToMock").value = data.urlToMock;
            }
            if (data.redirect) {
                document.getElementById("redirect").value = data.redirect;
            }
            document.getElementById("mockEnabled").checked =
                data.mockEnabled !== undefined ? data.mockEnabled : true;
        },
    );

    document.getElementById("saveSettings").addEventListener("click", () => {
        const urlToMock = document.getElementById("urlToMock").value;
        const redirect = document.getElementById("redirect").value;
        const mockEnabled = document.getElementById("mockEnabled").checked;

        chrome.storage.local.set({ urlToMock, redirect, mockEnabled }, () => {
            console.log("Settings saved");

            chrome.runtime.sendMessage(
                {
                    action: "updateSettings",
                    urlToMock,
                    redirect,
                    mockEnabled,
                },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error sending message:", chrome.runtime.lastError);
                    } else {
                        console.log("Response received:", response);
                    }
                },
            );
        });
    });
});
