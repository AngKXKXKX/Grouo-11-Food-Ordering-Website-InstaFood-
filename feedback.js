function msg() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    if (name === "" || email === "" || title === "" || description === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    var message = "Review submitted!\n\nName: " + name + "\nEmail: " + email + "\nTitle: " + title + "\nMessage: " + description;
    alert(message);

    return false; 
}
