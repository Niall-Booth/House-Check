import { animate} from 'https://esm.sh/animejs';

const STORAGE_VERSION = "2";

const savedVersion = localStorage.getItem("version") || "1";

if (savedVersion !== STORAGE_VERSION) {
    localStorage.removeItem("data")
    localStorage.setItem("version", STORAGE_VERSION);
}

$(document).ready(function () {

    function alertDisplay(heading, colour, message){
        $("form").css("filter", "blur(5px)");
        $("#alert h1").css("color", colour);
        $("#alert h1").text(heading);
        $("#alert p").text(message);
        $("#alert").css("display", "flex");
    }

    function checkComplete(){
        let data = JSON.parse(localStorage.getItem("data")) || {};
        var currentDate = new Date().toDateString();
        return currentDate === data.date;
    }

    $(".switch").on("click", function(){
        $(this).toggleClass("checked");
        $(this).css("border-color", "#222831");
        if($(this).hasClass("checked")){
            animate($(this).find("span")[0], { x: '6rem' });
        }
        else{
            animate($(this).find("span")[0], { x: '0rem' });
        }
    })

    $("#submit-button").on("click", function(){
        if(checkComplete()){
            alertDisplay("Complete", "#9AD872", "House has been checked today");
            return;
        }

        var numChecked = 0;
        $(".switch").each(function(){
            if($(this).hasClass("checked")){
                numChecked += 1;
            }
            else{
                $(this).css("border-color", "red")
            }
        })

        if(numChecked !== 4){
            alertDisplay("Failed", "#D62828", "Not everythings has been checked, see red switches for what is left to check");
        }
        else{
            alertDisplay("Success", "#9AD872", "House successfully checked");
            let data = JSON.parse(localStorage.getItem("data")) || {};
            data.date = new Date().toDateString();
            localStorage.setItem("data", JSON.stringify(data));
        }
    })

    $("#check-button").on("click", function(){
        if(checkComplete()){
            alertDisplay("Complete", "#9AD872", "House has been checked today")
        }
        else{
            alertDisplay("Incomplete", "#D62828", "House is still due to be checked today")
        }
    })

    $("#close").on("click", function(){
        $(this).parent().css("display", "none");
        $("form").css("filter", "blur(0px)");
    })


})