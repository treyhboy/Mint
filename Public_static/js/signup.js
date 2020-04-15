$(function() {
    const fname = $('#fname');
    const lname = $('#lname');
    const mob = $('#mob');
    const em = $('#em');
    const pass = $('#pass');
    const submit = $('#create-account');
    submit.click(function () {
        $.post(
            '/signup',
            {
                firstname: fname.val(),
                lastname: lname.val(),
                mobile: mob.val(),
                email: em.val(),
                password: pass.val(),
            },
            function (data) {
                if (data.success) {
                    window.location.href = 'http://localhost:3100/';
                    sessionStorage.setItem('name', fname.val() + lname.val());
                }
            }
        );
    });
    $('input').on('focus', function (e) {
        $(e.currentTarget)
            .siblings('label')
            .addClass('active');
    });
    $('input').on('focusout', function (e) {
        if ($(e.currentTarget).prop('value').length > 0) {
            $(e.currentTarget)
                .siblings('label')
                .addClass('active');
        } else {
            $(e.currentTarget)
                .siblings('label')
                .removeClass('active');
        }
    });
});
