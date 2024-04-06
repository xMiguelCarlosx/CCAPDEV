// FRONT-END JS For Posts view
const postBtn = document.getElementById("postBtn");
const postForm = document.forms.postForm;

postBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('click'); 
    // TODO 3.1: retrieve form data send POST request to `/post`
    const data = new FormData(postForm); // Retrieve data from postform
    const jstring = JSON.stringify(Object.fromEntries(data)); // convert formdata to js object, then stringify
    console.log(jstring);

    try {
        const response = await fetch('/posts', {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        // TODO 3.2: handle response based on statuscode
        if (response.status == 200) {
            location.reload(); // refresh the page
        } else {
            const message = `An error has occured. Status code: ${response.status}`;
            alert(message);
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }

});