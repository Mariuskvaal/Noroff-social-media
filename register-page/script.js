const formEl = document.querySelector("#registerForm");

formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const newData = URLSearchParams(formData);
    //console.log (formData.get('name'));

    fetch('https://api.noroff.dev/api/v1/social/auth/register'), {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization: '
        },
        body: data
    }
})
