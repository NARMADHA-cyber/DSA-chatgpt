const sideNavigation = document.querySelector(".sideNavigation"),
    sideBarToggle = document.querySelector(".fa-bars"),
    startContentUl = document.querySelector(".startContent ul"),
    inputArea = document.querySelector(".inputArea input"),
    sendRequest = document.querySelector(".fa-paper-plane"),
    chatHistory = document.querySelector(".chatHistory ul"),
    startContent = document.querySelector(".startContent"),
    chatContent = document.querySelector(".chatContent"),
    results = document.querySelector(".results"),
    loader = document.querySelector(".loader");

promptQuestion = [
    {
        question: "Write a code for Fibonacci series",
        icon: "fa-solid fa-code",
    },
    {
        question: "What is stack",
        icon: "fa-solid fa-database",
    },
    {
        question: "Explain bubble sort",
        icon: "fa-solid fa-laptop-code",
    },
    {
        question: "How to master DSA",
        icon: "fa-solid fa-wand-magic-sparkles",
    },
];

window.addEventListener("load", () => {
    promptQuestion.forEach(data => {
        let item = document.createElement("li");

        item.addEventListener("click", () => {
            getGeminiResponse(data.question, true);
        });

        item.innerHTML = `<div class="promptSuggestion"> 
            <p>${data.question}</p> 
            <div class="icon"><i class="${data.icon}"></i></div>
        </div>`;
        startContentUl.append(item);
    });
});

sideBarToggle.addEventListener("click", () => {
    sideNavigation.classList.toggle("expandClose");
});

inputArea.addEventListener("keyup", (e) => {
    if (e.target.value.length > 0) {
        sendRequest.style.display = "inline";
    } else {
        sendRequest.style.display = "none";
    }
});

sendRequest.addEventListener("click", () => {
    getGeminiResponse(inputArea.value, true);
});

function getGeminiResponse(question, appendHistory) {
    console.log(question);

    let historyLi = document.createElement("li");
    historyLi.addEventListener("click", () => {
        getGeminiResponse(question, false);
    });
    historyLi.innerHTML = `<i class="fa-regular fa-message"></i> ${question}`;
    chatHistory.append(historyLi);

    results.innerHTML = "";
    inputArea.value = "";
    startContent.style.display = "none";
    chatContent.style.display = "block";
    loader.style.display = "flex"; 

    let resultTitle = `
    <div class="resultTitle">
        <img src="images/img3.png"/>
        <p>${question}</p>
    </div>
    `;
    results.innerHTML += resultTitle;

    const AIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBP5ACN_hoYsGNrb925SrMv-pG-LwRVp8A`;
    fetch(AIURL, {
        method: "POST",
        body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }],
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        let responseData = jsonEscape(data.candidates[0].content.parts[0].text);
        console.log(responseData);
        
        let htmlContent = markdownToHtml(responseData);

        loader.style.display = "none"; 

        let resultResponse = `
        <div class="resultResponse">
            <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"/>
            <div id="typeEffect">${htmlContent}</div>
        </div>
        `;
        results.innerHTML += resultResponse;
    });
}

function newChat() {
    startContent.style.display = "block";
    chatContent.style.display = "none";
}

function jsonEscape(str){
    return str
    .replace (new RegExp("\r?\n\n", "g"), "<br>")
    .replace (new RegExp("\r?\n", "g"), "<br>");
}

function markdownToHtml(markdown) {
    let html = markdown;
    html = html.replace(/^### (.+?)$/gm, '<strong>$1</strong><br>');
    html = html.replace(/^## (.+?)$/gm, '<strong>$1</strong><br>');
    html = html.replace(/^# (.+?)$/gm, '<strong>$1</strong><br>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/^- (.+?)$/gm, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/g, '');
    html = html.replace(/'''/g, '');
    html = html.replace(/-/g, '');
    html = html.replace(/\n/g, '<br>');

    return html;
}
