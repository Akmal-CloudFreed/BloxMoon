console.log(String(document.querySelector("#__next > div > main > div.css-1an3oko-layout--PageContent.e1bfc8ra1 > div > div.css-kz0b6l-Crash--Wrapper.e1ysg5wy3 > div.css-i91ksx-Crash--GameContainer.e1ysg5wy2 > div.css-73qb9f-Controls--ControlsWrapper.e1it8rhg0 > div > div:nth-child(2) > button")
.textContent))

var CashOutAt = 1.5 // Value to cash out at
var AutoBet = true // Enable auto bet, can be set to true or false

while (true) {
    if (AutoBet === true) {
        if (String(document.querySelector("#__next > div > main > div.css-1an3oko-layout--PageContent.e1bfc8ra1 > div > div.css-kz0b6l-Crash--Wrapper.e1ysg5wy3 > div.css-i91ksx-Crash--GameContainer.e1ysg5wy2 > div.css-73qb9f-Controls--ControlsWrapper.e1it8rhg0 > div > div:nth-child(2) > button")
.textContent).toLowerCase().includes('place bet')) {
            console.log('Placing bet...')
            document.querySelector("#__next > div > main > div.css-1an3oko-layout--PageContent.e1bfc8ra1 > div > div.css-kz0b6l-Crash--Wrapper.e1ysg5wy3 > div.css-i91ksx-Crash--GameContainer.e1ysg5wy2 > div.css-73qb9f-Controls--ControlsWrapper.e1it8rhg0 > div > div:nth-child(2) > button").click()
        }
    }
    var CrashValue = String(document.querySelector("head > title").textContent).split("x")[0]
    if (+CrashValue >= CashOutAt) {
        if (String(document.querySelector("#__next > div > main > div.css-1an3oko-layout--PageContent.e1bfc8ra1 > div > div.css-kz0b6l-Crash--Wrapper.e1ysg5wy3 > div.css-i91ksx-Crash--GameContainer.e1ysg5wy2 > div.css-73qb9f-Controls--ControlsWrapper.e1it8rhg0 > div > div:nth-child(2) > button")
.textContent).toLowerCase().includes('cash out')) {
            document.querySelector("#__next > div > main > div.css-1an3oko-layout--PageContent.e1bfc8ra1 > div > div.css-kz0b6l-Crash--Wrapper.e1ysg5wy3 > div.css-i91ksx-Crash--GameContainer.e1ysg5wy2 > div.css-73qb9f-Controls--ControlsWrapper.e1it8rhg0 > div > div:nth-child(2) > button").click()
            console.log('Successfully cashed out at '+CashOutAt+"x!")
        }
    }
    await new Promise(resolve => setTimeout(resolve, 10));
}