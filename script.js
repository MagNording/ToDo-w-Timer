function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() !== '') {
        const ul = document.getElementById('taskList');
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = input.value;
        li.appendChild(taskSpan);

        const timerInput = document.createElement('input');
        timerInput.type = 'number';
        timerInput.value = '5'; // Default 5 minuter
        timerInput.min = '1';
        li.appendChild(timerInput);

        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start Timer';
        startBtn.onclick = function() {
            startTimer(timerInput.value, li);
        };
        li.appendChild(startBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel Timer';
        cancelBtn.onclick = function() {
            if (li.timerId) {
                clearInterval(li.timerId);
            }
            li.style.color = 'black'; // Återställer textfärgen
        };
        li.appendChild(cancelBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Ta bort';
        removeBtn.onclick = function() {
            ul.removeChild(li);
        };
        li.appendChild(removeBtn);

        ul.appendChild(li);
        input.value = ''; // Rensa inputfältet efter tillägg
    } else {
        alert('Skriv in en uppgift!');
    }
}


function startTimer(duration, li) {
    let time = duration * 60; // omvandlar minuter till sekunder
    li.timerId = setInterval(function() {
        if (time <= 0) {
            clearInterval(li.timerId);
            li.style.color = 'red'; // Markerar uppgiften som klar/över tiden
            showAlert('Tiden är ute för: ' + li.firstChild.textContent.split(' - ')[0]); // Alert för att visa att tiden är ute
            flashScreen(); // Extra: Få skärmen att blinka
        } else {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            li.firstChild.textContent = `${li.firstChild.textContent.split(' - ')[0]} - ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function showAlert(message) {
    alert(message); // Visar en system alert-dialog
}

function flashScreen() {
    const originalColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'red';
    setTimeout(function() {
        document.body.style.backgroundColor = originalColor;
    }, 500); // Återställer bakgrundsfärgen efter en halv sekund
}

