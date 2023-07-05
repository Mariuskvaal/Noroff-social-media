const formEl = document.querySelector("#registerForm");

const method = "post";


formEl.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(formEl);
    const profile = Object.fromEntries(formData.entries())
    register(profile);
    //console.log (formData.get('name'));

    async function register(profile) {
        const registerURL = 'https://nf-api.onrender.com/api/v1/social/auth/register'
        const body = JSON.stringify(profile);

        const response = await fetch(registerURL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body
        })

        const result = await response.json()
        return result
    }
}
)
