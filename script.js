var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("saveCard").addEventListener("click", () => {
    addFlashcard();
});

document.getElementById("delCard").addEventListener("click", () => {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
});

document.getElementById("addCard").addEventListener("click", () => {
    document.getElementById("createCard").style.display = "block";
});

document.getElementById("closeCard").addEventListener("click", () => {
    document.getElementById("createCard").style.display = "none";
});

flashcardMaker = (text, delIndex) => {
    const flashcard = document.createElement("div");
    const question = document.createElement('h2');
    const answer = document.createElement('h2');
    const del = document.createElement('i');

    flashcard.className = 'flashcard';

    question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
    question.textContent = text.my_question;

    answer.setAttribute("style", "text-align:center; display:none; color:red");
    answer.textContent = text.my_answer;

    del.className = "fas fa-minus";
    del.addEventListener("click", () => {
        contentArray.splice(delIndex, 1);
        localStorage.setItem('items', JSON.stringify(contentArray));
        window.location.reload();
    })

    flashcard.appendChild(question);
    flashcard.appendChild(answer);
    flashcard.appendChild(del);

    flashcard.addEventListener("click", () => {
        if (answer.style.display == "none")
            answer.style.display = "block";
        else
            answer.style.display = "none";
    })

    document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

//retrieve question and answer
addFlashcard = () => {
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");

    let flashcard_info = {
            'my_question': question.value,
            'my_answer': answer.value
        }
        //storage lines
    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));
    flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
    question.value = "";
    answer.value = "";
}