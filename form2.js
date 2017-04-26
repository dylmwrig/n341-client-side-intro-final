/*
 TITLE: form2.js
 AUTHOR: Dylan Wright (DMW)
 PURPOSE: take input from forms
 ORIGINALLY CREATED ON: 4/23/17
 LAST MODIFIED ON: 4/23/17
 LAST MODIFIED BY: Dylan Wright (DMW)
 MODIFICATION HISTORY:
 4/17/17: copied file from JQuery UI, added formSubmit, clearFields, and confirmFields functions
 4/19/17: added validation functionality, had to remove/modify a lot of my manual validation stuff I did
 4/23/17: added various extra widgets such as radio buttons and checkboxes
 4/24/17: added more complex functionality such as specific rules as parameters in the validate function
 I also removed some manual validation methods I had created before utilizing JQuery UI/validate
 */

//similarly to form2.css, I just copied this from the index included in JQuery UI
//however, I built on this one afterwards

$(document).ready(function()
{
    $("input[type='submit']").button();
    $("input[type='reset']").button();

    //currently unsure how to integrate validate into the accordion functionality
    //because I now have to wrap everything in a form element
    //$("#accordion").accordion();

    //JQuery UI methods
    //
    //start with validate, with specific parameters set for each piece of input
    //then set the "messages", which give feedback to the user while using the form
    var validator = $("#commissionForm").validate({
        invalidHandler: function() {
            alert("We in sum shit");
            alert(this.numberOfInvalids())
            alert( validator.numberOfInvalids() + " field(s) are invalid" );
        },

        rules:
        {
            description:
            {
                required: true
            },
            email:
            {
                required: true,
                email: true
            },
            phone:
            {
                digits: true,
                maxlength: 10
            },
            lowRange:
            {
                digits: true
            },
            highRange:
            {
                digits: true
            }
        }, //end rules

        messages:
        {
            description:
            {
                required: "Please describe your piece for the artist."
            },
            email:
            {
                required: "Please enter an email for the artist to contact you with",
                email: "Please enter a valid email."
            },
            phone:
            {
                digits: "Please enter a valid phone number",
                maxlength: "Please enter a valid phone number"
            },
            lowRange:
            {
                digits: "Please enter a number"
            },
            highRange:
            {
                digits: "Please enter a number"
            }
        } //end messages
    }); //end validate

    $("loginForm").validate({
        rules:
        {
            email:
            {
                required: true
            },
            password:
            {
                required: true
            }
        } //end rules
    }); //end validate

    $("input[type='radio']").checkboxradio();
    $("#calendar").datepicker();
    $("#submit").click(formSubmit);

    //check each input and store it in the output for the user to review
    function formSubmit()
    {
        /*
        var errors = validator.numberOfInvalids();
        if (errors)
        {
            alert("Outside with the cuuuuuuties")
        }
        */



        var strDescriptionInput = new String($("#description").val());
        var strEmailInput = new String($("#email").val());
        var strPhoneNum = new String($("#phone").val());
        var strLowPrice = new String($("#lowRange").val());
        var strHighPrice = new String($("#highRange").val());

        //calendar broke when uploaded to pegasus
        //var strDatePicked = $("#calendar").datepicker("getDate");

        //price range is not necessary; if the user has none, the artist will come up with her own price
        if (strLowPrice == "" && strHighPrice == "")
        {
            strLowPrice = "Artist's discretion";
        } //end if

        //otherwise, if the user only inputted a low or high end for the price range
        //tell them that the price will be "around" their number
        else if (strLowPrice == "")
        {
            strLowPrice = "Around ";
        } //end else if

        else if (strHighPrice == "")
        {
            strHighPrice = strLowPrice;
            strLowPrice = "Around ";
        } //end else if

        //otherwise, both forms are filled, so put a dash between them to indicate range
        else
        {
            strLowPrice += "-";
        } //end else

        //set output for everything depending on what has been filled
        //output the necessary information first
        var output = document.getElementById("output");
        output.innerHTML = "Your description: " + strDescriptionInput + "<br>" +
            "Your email: " + strEmailInput + "<br>" +
            "Your price range (this is up for negotiation): " + strLowPrice + strHighPrice;

        if (strPhoneNum != "")
        {
            output.innerHTML += "<br> Your phone number: " + strPhoneNum;
        } //end if

        /*
        //for some reason the calendar stuff broke when I uploaded to pegasus
        //I can't say I know how to check that a date has been selected on the calendar.
        if (strDatePicked != "")
        {
            output.innerHTML += "<br> When you want it by: " + strDatePicked;
        } //end if
        */

        var radioOutput = "";
        if ($("input[id=radioBust]:checked").val())
        {
            radioOutput = "bust";
        } //end if

        else if ($("input[id=radioBody]:checked").val())
        {
            radioOutput = "full body";
        } //end else if

        else if ($("input[id=radioWaist]:checked").val())
        {
            radioOutput = "waist up";
        } //end else if

        else if ($("input[id=radioNotChar]:checked").val())
        {
            radioOutput = "not a character";
        } //end else if

        if (radioOutput != "")
        {
            output.innerHTML += "<br> Type of commission: " + radioOutput;
        } //end if

        if ($("input[id=checkbox]:checked").val())
        {
            output.innerHTML += "<br> The commission will be in color.";
        } //end if
    } //end formSubmit

    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $("#autocomplete").autocomplete({
        source: availableTags
    });


    $("#button").button();
    $("#button-icon").button({
        icon: "ui-icon-gear",
        showLabel: false
    });


    $("#radioset").buttonset();


    $("#controlgroup").controlgroup();


    $("#tabs").tabs();


    $("#dialog").dialog({
        autoOpen: false,
        width: 400,
        buttons: [
            {
                text: "Ok",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

    // Link to open the dialog
    $("#dialog-link").click(function (event) {
        $("#dialog").dialog("open");
        event.preventDefault();
    });


    $("#datepicker").datepicker({
        inline: true
    });


    $("#slider").slider({
        range: true,
        values: [17, 67]
    });


    $("#progressbar").progressbar({
        value: 20
    });


    $("#spinner").spinner();


    $("#menu").menu();


    $("#tooltip").tooltip();


    $("#selectmenu").selectmenu();


    // Hover states on the static widgets
    $("#dialog-link, #icons li").hover(
        function () {
            $(this).addClass("ui-state-hover");
        },
        function () {
            $(this).removeClass("ui-state-hover");
        }
    );
}); //end document.ready