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

            toggleIndicator(data.mockEnabled);
        },
    );

    document.getElementById("saveSettings").addEventListener("click", () => {
        const urlToMock = document.getElementById("urlToMock").value;
        const redirect = document.getElementById("redirect").value;
        const mockEnabled = document.getElementById("mockEnabled").checked;

        chrome.storage.local.set({ urlToMock, redirect, mockEnabled }, () => {
            console.log("Settings saved");

            toggleIndicator(mockEnabled);

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

function toggleIndicator(enabled) {
    const indicator = document.getElementById("indicator");
    const indicatorText = document.getElementById("indicator-text");

    if (enabled) {
        indicator.classList.remove("bg-red-500");
        indicator.classList.remove("bg-gray-500");
        indicator.classList.add("bg-green-500");
        indicatorText.innerText = "On";
    } else {
        indicator.classList.remove("bg-green-500");
        indicator.classList.remove("bg-gray-500");
        indicator.classList.add("bg-red-500");
        indicatorText.innerText = "Off";
    }
}
