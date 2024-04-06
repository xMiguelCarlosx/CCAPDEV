// FRONT-END JS For Users view
const submitBtn = document.querySelector("#createUser");
const userForm = document.forms.createUserForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    console.log('submit');
    const myObj = { 
        username: formData.get("username"),
        color: formData.get("favColor")
    };
    console.log(myObj);
    const jString = JSON.stringify(myObj);
    console.log(jString);

    try {
        const response = await fetch("/users", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        if (response.status === 200) {
            location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});