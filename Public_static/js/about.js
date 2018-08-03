$( function () {
        let ret= sessionStorage.getItem('name');
        if(ret) {
            $('#face').empty();
            $('#face').append(`<div style="display: inline"><img id='kl' src="img/user.png" style="height: 50px;margin-top: 10px;"><span style="color: white;margin-left: -22px;margin-top: 10px">${ret}</span></div>`)
            $('#butt').empty();
            $('#kl').click(function () {
                ret = "";
                sessionStorage.setItem('name',"");
                window.location.href = "http://localhost:3100/"
            })
        }
        let gs = $('#gs');
        gs.click(function () {
            if(ret)
            {window.location.href = "main.html"
            }
            else
            {
                window.alert(`Login or sign up first`);
            }
        })

});
