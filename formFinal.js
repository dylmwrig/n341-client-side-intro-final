/*
 TITLE: formFinal.js
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
 4/29/17: changed name to formFinal.js from formFinal.js
 */

//similarly to form2.css, I just copied this from the index included in JQuery UI
//however, I built on this one afterwards

$(document).ready(function()
{
    var dateSelected = ""; //used to track the date entered into datepicker

    $("input[type='submit']").button();
    $("input[type='reset']").button();
    $("#slider").slider();

    //suggestions to give to the user when entering who their commission is for
    var autocompleteOptions =
        [
            "myself",
            "my friend",
            "my mom",
            "my dad",
            "my sibling",
            "my coworker",
            "a company",
            "a podcast",
            "my significant other",
            "a role-playing campaign",
        ]; //end autocompleteOptions

    //JQuery UI methods
    //
    //start with validate, with specific parameters set for each piece of input
    //then set the "messages", which give feedback to the user while using the form
    //many of these are not actually required, but I was docked points when I didn't make them required, so I'll make everything required for the moment.
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
                required: true,
                digits: true,
                maxlength: 10
            },
            slider:
            {
                required: true
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
                required: "Please enter a phone number",
                digits: "Please enter a valid phone number",
                maxlength: "Please enter a valid phone number"
            },
            slider:
            {
                required: "Please enter a general price range, it doesn't have to be exact."
            }
        } //end messages
    }); //end validate

    var detailsForm = $("#detailsForm");
    detailsForm.validate({
        //groups allows for placing the error message after a group of form inputs
        groups:
        {
            radios : "radio1" //all of the radio buttons
        }, //end groups

        errorPlacement: function(error, element)
        {
            if (element.attr("name") == "radio1")
            {
                error.insertAfter($("#radioNotChar")); //last radio button so place the error after this
            } //end if

            else
            {
                error.insertAfter(element);
            } //end else
        },

        rules:
        {
            radio1:
            {
                required: true
            },

            recipient:
            {
                required: true
            },

            calendar:
            {
                required: true
            }
        }, //end rules

        messages:
        {
            radio1:
            {
                required: "It is required to choose a 'type' of commission"
            },

            recipient:
            {
                required: "Please enter a recipient"
            },

            calendar:
            {
                required: "Please enter a date, it doesn't have to be exact"
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
    $("#accordion").accordion();

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

    $("#recipient").autocomplete(
    {
        source: autocompleteOptions
    }); //end autocomplete

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
        var strRecipient = new String($("#recipient").val());

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

        if (strRecipient != "")
        {
            output.innerHTML += "<br> The commission is for " + strRecipient;
        } //end if
    } //end formSubmit

    $("#button").button();
}); //end document.ready