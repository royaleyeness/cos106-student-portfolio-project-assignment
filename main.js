
document.addEventListener("DOMContentLoaded", function () {

    // DISPLAY CURRENT YEAR

    document.querySelectorAll("#year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ACADEMIC PLANNER

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(
        localStorage.getItem("academicTasks") || "[]"
    );

    // Save tasks in browser storage
    function saveTasks() {
        localStorage.setItem(
            "academicTasks",
            JSON.stringify(tasks)
        );
    }

    // Display tasks on the webpage
    function displayTasks() {

        if (!taskList) return;

        taskList.innerHTML = "";

        tasks.forEach(function (task, index) {

            const li = document.createElement("li");

            // Completion checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", function () {

                tasks[index].completed = checkbox.checked;

                saveTasks();
                displayTasks();

            });

            // Task description
            const span = document.createElement("span");
            span.textContent = task.text;

            if (task.completed) {
                span.style.textDecoration = "line-through";
            }

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "button";

            deleteButton.addEventListener("click", function () {

                tasks.splice(index, 1);

                saveTasks();
                displayTasks();

            });

            li.append(checkbox, span, deleteButton);

            taskList.appendChild(li);

        });

    }


    // ADD NEW TASK
    if (taskForm) {

        taskForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const text = taskInput.value.trim();

            if (text === "") {
                alert("Please enter a task.");
                return;
            }

            tasks.push({
                text: text,
                completed: false
            });

            saveTasks();
            displayTasks();

            taskForm.reset();

        });

        displayTasks();

    }


    // CONTACT FORM VALIDATION

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();

            const email = document.getElementById("email").value.trim();

            const phone = document.getElementById("phone").value.trim();

            const message = document.getElementById("message").value.trim();

            const feedback = document.getElementById("feedback");

            // Check empty fields
            if (!name || !email || !phone || !message) {

                feedback.textContent = "Please complete all fields.";
                feedback.style.color = "red";

                return;
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                feedback.textContent = "Please enter a valid email address.";
                feedback.style.color = "red";

                return;
            }

            // Validate phone number
            if (!/^\d+$/.test(phone)) {

                feedback.textContent = "Phone number must contain digits only.";
                feedback.style.color = "red";

                return;
            }

            feedback.textContent =
                "Form validation successful! Thank you for your message.";

            feedback.style.color = "green";

            contactForm.reset();

        });

    }

});
