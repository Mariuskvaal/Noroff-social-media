import { baseURL } from "../js/constants/api.js";

const formEl = document.querySelector("#registerForm");

const method = "post";

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());
  console.log("profile", profile);
  const message = document.querySelector("#reg-message");
  try {
    const response = await register(profile);
    message.innerHTML = "Registration is sucsess";
    console.log(response);
    form.reset();
    // display a message telling the user to login
  } catch (error) {
    message.innerHTML = error;
    console.error(error);
    // display the error to the user
  }

  async function register(profile) {
    const registerURL = `${baseURL}auth/register`;
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });
    if(response.ok === true ){
        const result = await response.json();
        return result;
    }else{ 
        throw new Error ("shit is a cow");
    }


  }
});
