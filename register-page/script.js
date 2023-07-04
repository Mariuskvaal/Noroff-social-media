const formEl = document.querySelector("#registerForm");

formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    //console.log (formData.get('name'));

    fetch('https://nf-api.onrender.com/api/v1/social/auth/register', {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(data);
})
