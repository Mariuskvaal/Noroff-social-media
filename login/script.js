const formEl = document.querySelector("#loginForm");

const method = "post";


formEl.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(formEl);
    const profile = Object.fromEntries(formData.entries())
    login(profile);
    //console.log (formData.get('name'));

    async function login(profile) {
        const loginURL = 'https://nf-api.onrender.com/api/v1/social/auth/login'
        const body = JSON.stringify(profile);

        const response = await fetch(loginURL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body
        })

        const result = await response.json();

        function saveUserToStorage = localStorage.setItem('token', result.accessToken);
    
        localStorage.setItem('user', JSON.stringify({
            name: result.name,
            email: result.email,
            avatar: result.avatar,
            banner: result.banner
        }));
    
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
    
        console.log(token);
        console.log(user);
    }
}
)


