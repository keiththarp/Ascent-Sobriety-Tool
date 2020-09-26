const signIn = $('.signIn')
const signUp = $('.signUp')
const back = $('.back')

$(".signIn").click(function(){
    window.location.replace("signin.html");
});
$(".back").click(function(){
    window.location.replace("start.html");
});
$(".signUp").click(function(){
    window.location.replace("register.html");
});
