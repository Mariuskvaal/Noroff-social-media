const formEl = document.querySelector("#loginForm");

formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    //console.log (formData.get('name'));

    fetch('https://nf-api.onrender.com/api/v1/social/auth/login', {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(data);
})