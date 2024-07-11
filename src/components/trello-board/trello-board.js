import './trello-board.css';

document.addEventListener("DOMContentLoaded", function() {
    let cardHeaders = document.querySelectorAll(".header_card");
    let fields = document.querySelectorAll(".card");

    cardHeaders.forEach(function(cardHeader) {
        let ellipsis = document.createElement("div");
        ellipsis.classList.add("ellipsis");
        ellipsis.textContent = "...";
        cardHeader.appendChild(ellipsis);
    });

    fields.forEach(function(field) {
        let fieldTask = document.createElement("div");
        fieldTask.classList.add("fieldTask");
        field.appendChild(fieldTask);

        let addTask = document.createElement("div");
        addTask.classList.add("addTask");
        addTask.innerHTML = `
            <span class="addCard">+ Add another card</span>
        `;
        field.appendChild(addTask);
    });

    let addCards = document.querySelectorAll('.addCard');
    addCards.forEach(function(addCard) {
        addCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('addCard')) {
                let parentElement = e.target.closest('.card');
                let fieldTaskElement = parentElement.querySelector('.fieldTask');
                if (fieldTaskElement.querySelector('.task form')) {
                    alert("Вы не завершили добавление предыдущей карты.");
                    return;
                }
                let task = document.createElement("div");
                task.classList.add("task");
                task.innerHTML = `
                    <div>
                        <form>
                            <input type="text" style="width: 242px">
                        </form>
                        <div>
                            <button class="add-cart-button">добавить карту</button>
                        </div>
                    </div>
                `;
                fieldTaskElement.appendChild(task);

                let addCartButton = task.querySelector('.add-cart-button');
                let inputField = task.querySelector('input[type="text"]');
                let form = task.querySelector('form');

                const addCardFunction = (event) => {
                    event.preventDefault();
                    if (inputField.value.trim() === "") {
                        alert("Поле ввода не может быть пустым.");
                    } else {
                        task.innerHTML = `
                        <div class="card-task">
                        ${inputField.value}
                        <span class="delete-icon">х</span>
                        </div>`;
                    }
                };

                addCartButton.addEventListener('click', addCardFunction);

                form.addEventListener('submit', addCardFunction);
            }
        });
    });

    function showDeleteIcon(card) {
        let deleteIcon = card.querySelector('.delete-icon');
        deleteIcon.style.display = 'block';
      }

    function hideDeleteIcon(card) {
        var deleteIcon = card.querySelector('.delete-icon');
        deleteIcon.style.display = 'none';
      }

    function deleteCard(deleteIcon) {
        var card = deleteIcon.parentNode;
        card.parentNode.removeChild(card);
      }

});
