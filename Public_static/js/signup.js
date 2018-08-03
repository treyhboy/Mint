$( function () {
    let fname = $('#fname');
    let lname = $('#lname');
    let mob = $('#mob');
    let em = $('#em');
    let pass = $('#pass');
    let submit = $('#create-account');
    console.log("enter");
    submit.click(function () {
        $.post('/signup', {fname: fname.val(),lname:lname.val(),mob:mob.val(),em:em.val(),pass:pass.val() }, function (data) {
            console.log('submit');
            if (data.success) {
                console.log('success');
                window.location.href = "http://localhost:3100/"
                sessionStorage.setItem('name',fname.val()+lname.val());

            }
            else {
                console.log('no success');
            }
        })
    })
})
