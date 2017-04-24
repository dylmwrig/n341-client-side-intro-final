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
 4/23/17: added radio button
 */

//similarly to form2.css, I just copied this from the index included in JQuery UI
//however, I built on this one afterwards

$(document).ready(function()
{
    //currently unsure how to integrate validate into the accordion functionality
    //because I now have to wrap everything in a form element
    //$("#accordion").accordion();

    //JQuery UI methods
    $("#commissionForm").validate();
    $("#priceSlider").slider();
    $("input[type='radio']").checkboxradio();

    $( "#slider" ).slider();
    $("#calendar").datepicker();

    $("#submit").click(formSubmit);
    $("#clear").click(clearFields);
    $("#confirm").click(confirmFields);

    var complete = false; //used in confirmFields
    var formCheck = false; //user must click submitForm before confirm

    //check each input and store it in the output for the user to review
    function formSubmit()
    {
        var strDescriptionInput = new String($("#description").val());
        var strEmailInput = new String($("#email").val());

        //price range is not necessary; if the user has none, the artist will come up with her own price
        var strRangeInput = "Artist's discretion";
        if (new String($("#price").val()) != "")
        {
            strRangeInput = new String($("#price").val());
        } //end if

        //did my own validation originally before realizing that we'd be using JQuery for this

        var output = document.getElementById("output");
        output.innerHTML = "Your description: " + strDescriptionInput + "<br>" +
                           "Your email: " + strEmailInput + "<br>" +
                           "Your price range (this is up for negotiation): " + strRangeInput;3

        formCheck = true;
    } //end formSubmit

    //clear each field, because setting type to reset was not working for some reason
    function clearFields()
    {
        $('input').val('');
    } //end clearFields

    //make sure the user is ready to send their inputted information
    function confirmFields()
    {
        if (!complete) //check that the user is not spamming the complete field, the typical user will only have one commission at a time
        {
            if (formCheck)
            {
                var areYouSure = confirm("Are you sure this is all correct? If so, the information will be sent to the artist.");

                if (areYouSure) {
                    alert("You will be contacted ASAP! Thank you for your interest!");
                    complete = true;
                } //end if
            } //end if

            else
            {
                alert("Please click 'Submit' to review your input, first.");
            } //end else
        } //end if

        else
        {
            alert("If you are actually submitting a second commission, please refresh the page.");
        } //end else
    } //end confirmFields

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