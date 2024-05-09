chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateSettings") {
        const rule = {
            id: 1,
            priority: 1,
            action: {
                type: "redirect",
                redirect: { url: message.redirect },
            },
            condition: {
                urlFilter: message.urlToMock,
                resourceTypes: ["xmlhttprequest"],
            },
        };

        // Update or remove rules based on whether mocking is enabled
        if (message.mockEnabled) {
            chrome.declarativeNetRequest.updateDynamicRules(
                {
                    addRules: [rule],
                    removeRuleIds: [1],
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error("Failed to update rules:", chrome.runtime.lastError);
                    } else {
                        console.log("Rules updated successfully");
                    }
                },
            );
        } else {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1],
            });
        }

        return true;
    }
});
