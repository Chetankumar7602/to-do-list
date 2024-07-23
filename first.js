document.addEventListener("DOMContentLoaded", () => {
    const tb = document.querySelector("table tbody");
    const textInput = document.querySelector("#text");
    const addButton = document.querySelector("#add");

    const loadNotes = () => {
        let data = localStorage.getItem("notes");
        tb.innerHTML = ""; // Clear the table body before loading
        if (data == null) {
            tb.innerHTML = "<tr><td colspan='3'>No notes to show</td></tr>";
        } else {
            let arr = JSON.parse(data);
            let str = "";
            arr.forEach((element, index) => {
                str += `<tr>
                    <td>${element.note}</td>
                    <td><button class="edit" data-index="${index}">Edit</button></td>
                    <td><button class="delete" data-index="${index}">Delete</button></td>
                </tr>`;
            });
            tb.innerHTML = str;
        }
    };

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const note = textInput.value.trim();
        if (note) {
            let notes = localStorage.getItem("notes");
            let json = notes ? JSON.parse(notes) : [];
            json.push({ note: note });
            localStorage.setItem("notes", JSON.stringify(json));
            alert("Note saved");
            textInput.value = "";
            loadNotes(); // Refresh the table to show the new data
        } else {
            alert("Please enter a note");
        }
    });

    tb.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        let notes = JSON.parse(localStorage.getItem("notes"));
        if (e.target.classList.contains("delete")) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
        } else if (e.target.classList.contains("edit")) {
            const newNote = prompt("Edit your note:", notes[index].note);
            if (newNote !== null) {
                notes[index].note = newNote;
                localStorage.setItem("notes", JSON.stringify(notes));
                loadNotes();
            }
        }
    });

    loadNotes();
});
