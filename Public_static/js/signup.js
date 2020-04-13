$(function() {
  let fname = $("#fname");
  let lname = $("#lname");
  let mob = $("#mob");
  let em = $("#em");
  let pass = $("#pass");
  let submit = $("#create-account");
  submit.click(function() {
    $.post(
      "/signup",
      {
        firstname: fname.val(),
        lastname: lname.val(),
        mobile: mob.val(),
        email: em.val(),
        password: pass.val()
      },
      function(data) {
        if (data.success) {
          window.location.href = "http://localhost:3100/";
          sessionStorage.setItem("name", fname.val() + lname.val());
        } else {
        }
      }
    );
  });
  $("input").on("focus", function(e) {
    $(e.currentTarget)
      .siblings("label")
      .addClass("active");
  });
  $("input").on("focusout", function(e) {
    $(e.currentTarget).prop("value").length > 0
      ? $(e.currentTarget)
          .siblings("label")
          .addClass("active")
      : $(e.currentTarget)
          .siblings("label")
          .removeClass("active");
  });
});
