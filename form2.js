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
 4/26/17: page no longer displays output if the user misses any required fields
 */

//similarly to form2.css, I just copied this from the index included in JQuery UI
//however, I built on this one afterwards

$(document).ready(function()
{
    var dateSelected = ""; //used to track the date entered into datepicker

    $("input[type='submit']").button();
    $("input[type='reset']").button();
    $("#slider").slider();

    //JQuery UI methods
    //
    //start with validate, with specific parameters set for each piece of input
    //then set the "messages", which give feedback to the user while using the form
    var commissionForm = $("#commissionForm");
    commissionForm.validate({
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

    var detailsForm = $("#detailsForm");
    detailsForm.validate({
        rules:
        {
            radio1:
            {
                required: true
            }
        }, //end rules

        messages:
        {
            radio1:
            {
                required: "It is required to choose a 'type' of commission"
            }
        } //end messages
    }); //end validate

    var loginForm = $("#loginForm");
    loginForm.validate({
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
        }, //end rules

        messages:
        {
            email:
            {
                required: "Please enter an email"
            },

            password:
            {
                required: "Please enter a password"
            }
        } //end messages
    }); //end validate

    $("input[type='radio']").checkboxradio();
    $("#submit").click(formSubmit);
    $("#detailReset").click(resetDate);

    function resetDate()
    {
        dateSelected = "";
    } //end resetDate

    var lowPrice = -1, highPrice = -1;
    //price slider
    $("#slider").slider(
    {
        range: true,
        values: [0, 67],
        min: 0,
        max: 100,
        slide: function( event, ui )
        {
            $( "#priceRange" ).val("$" + ui.values[0] + " - $" + ui.values[1]);
            lowPrice = ui.values[0];
            highPrice = ui.values[1];
        } //end slide
    }); //end slider

    $("#calendar").datepicker(
    {
        inline: true,
        onSelect: function(dateText)
        {
            dateSelected = dateText;
        } //end onSelect
    }); //end datepicker

    //check each input and store it in the output for the user to review
    function formSubmit()
    {
        //only output the entries of the user if all required forms are filled
        if (!detailsForm.valid() || !commissionForm.valid())
        {
            $("#output").innerHTML = "Please enter information in all of the required fields.";
            return;
        } //end if

        var strDescriptionInput = new String($("#description").val());
        var strEmailInput = new String($("#email").val());
        var strPhoneNum = new String($("#phone").val());
        var strDatePicked = new String($("#calendar").val());

        //calendar broke when uploaded to pegasus
        //var strDatePicked = $("#calendar").datepicker("getDate");

        //price range is not necessary; if the user has none, the artist will come up with her own price
        //you are not able to input negative numbers into the slider
        //for this reason, we can check if the values are different from their initial state
        if (lowPrice == -1 && highPrice == -1)
        {
            priceOutput = "Artist's discretion";
        } //end if

        //otherwise, both forms are filled, so put a dash between them to indicate range
        else
        {
            priceOutput = "$" + lowPrice + "-$" + highPrice;
        } //end else

        //set output for everything depending on what has been filled
        //output the necessary information first
        var output = document.getElementById("output");
        output.innerHTML = "Your description: " + strDescriptionInput + "<br>" +
            "Your email: " + strEmailInput + "<br>" +
            "Your price range (this is up for negotiation): " + priceOutput;

        if (strPhoneNum != "")
        {
            output.innerHTML += "<br> Your phone number: " + strPhoneNum;
        } //end if

        if (dateSelected != "")
        {
            output.innerHTML += "<br> You want it by: " + dateSelected;
        } //end if

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

        if ($("input[id=checkboxColor]:checked").val())
        {
            output.innerHTML += "<br> The commission will be in color.";
        } //end if

        if ($("input[id=checkboxBackground]:checked").val())
        {
            output.innerHTML += "<br> The commission will have a background.";
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