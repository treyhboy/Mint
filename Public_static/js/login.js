$(function () {
    const user = $('#user');
    const pass = $('#pass');
    const submit = $('#submit');
    submit.click(function (event) {
        event.preventDefault();
        $.post('/login', { email: user.val(), password: pass.val() }, function (
            data
        ) {
            console.log('submit');
            if (data.status === 'found') {
                console.log('success');
                window.location.href = 'http://localhost:3100/';
                sessionStorage.setItem('name', data.name);
            } else {
                console.log('no success');
            }
        });
    });
});

// Triggers on google sign in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('ID: ' + googleUser.getAuthResponse().id_token);
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    $.get('/google', function (
        data
    ) {
        console.log('submit');
        if (data.status === 'found') {
            console.log('success');
            window.location.href = 'http://localhost:3100/';
            sessionStorage.setItem('name', data.name);
        } else {
            console.log('no success');
        }
    });
}
