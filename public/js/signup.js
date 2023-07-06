async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    console.log(username,password);
    if (username && password && email) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                name:username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {        
            document.location.replace('/');
        } else {
            console.log()
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);