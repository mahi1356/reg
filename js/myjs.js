
window.onload = function() {

    var all_collection = {
        "MovieDatabase": [{
                "name": "The Change-Up",
                "genre": "comedy",
                "director": "David Dobkin",
                "price": 15
            },
            {
                "name": "Rise of the Planet of the Apes",
                "genre": "SciFi",
                "director": "Rupert Wyatt",
                "price": 20
            },
            {
                "name": "30 Minutes or Less",
                "genre": "adventure",
                "director": "Ruben Fleischer",
                "price": 25
            },
            {
                "name": "Final Destination 5",
                "genre": "Horror",
                "director": "Steven Quale",
                "price": 19
            }
        ],
        //data for future projects
        "GroceryShopping": [{
                "item_name": "bread",
                "type": "bakery",
                "brand": "abc",
                "price": 3.5
            },
            {
                "item_name": "milk",
                "type": "diary",
                "brand": "farmers",
                "price": 4.99
            },
            {
                "item_name": "juice",
                "type": "drink",
                "brand": "minute maid",
                "price": 4
            },
            {
                "item_name": "cake",
                "type": "bakery",
                "brand": "tarder joes",
                "price": 6.50
            },
        ]
    }

    var first_dropdown = document.getElementById("firstSelect");
    var second_dropdown = document.getElementById("secondSelect");
    var third_dropdown = document.getElementById("thirdSelect");
    var student_radio = document.getElementById("student_radio");
    var senior_radio = document.getElementById("senior_radio");
    var counter = 0;
    var total = 0;
    const $table = $('#demo');
    var result = document.getElementById("promo_result");
    var all_collection_array = Object.keys(all_collection);
    var basket_items = [];
    var input_promo_value = "";

    // set up first drop down list
    for (var j = 0; j < all_collection_array.length; j++) {
        //create option
        var new_option = document.createElement("option");
        //create text node 
        var text_node = document.createTextNode(all_collection_array[j]);
        //add text note to option
        new_option.appendChild(text_node);
        //set value to option
        new_option.setAttribute("value", all_collection_array[j]);
        first_dropdown.appendChild(new_option);
    };

    first_dropdown.onchange = function() {
        //leave first empty option in second drop down list
        second_dropdown.length = 1
        var selected_item_index_number = first_dropdown.selectedIndex;
        //MovieDatabase selected
        if (selected_item_index_number == 1) {
            var second_list_search = Object.keys(all_collection.MovieDatabase[0]);
            //Grocery selected
        } else if (selected_item_index_number == 2) {
            var second_list_search = Object.keys(all_collection.GroceryShopping[0]);
        }
        for (var i = 0; i < second_list_search.length - 1; i++) {
            //create option
            var new_option = document.createElement("option");
            //create text node 
            var text_node = document.createTextNode(second_list_search[i]);
            //add text note to option
            new_option.appendChild(text_node);
            //set value to option
            new_option.setAttribute("value", second_list_search[i]);
            second_dropdown.appendChild(new_option);
        }
    };

    // setup promo text box and check input against discount code which is: final 
    $(document).ready(function() {

        $("#button_promo").click(function() {

            var input_promo_value = document.getElementById("promo").value;

            if (first_dropdown.selectedIndex == 0 || second_dropdown.selectedIndex == 0) {
                alert("Please select from drop down list first");
                $('#promo').val('');
            } else if (input_promo_value == "final") {
                if (student_radio.checked || senior_radio.checked) {
                    var reduced_price = total - (0.15 * total);
                    $("#message_price").html("You got total of %15 off").css("color", "green");
                    $("#item_price").html("Price reduced to : " + reduced_price);
                } else {
                    var reduced_price = total - (0.05 * total);
                    $("#message_price").html("You got total of %5 off").css("color", "green");
                    $("#item_price").html("Price reduced to : " + reduced_price);
                }
            } else if (input_promo_value == "" || input_promo_value.length == 0 || input_promo_value == null) {
                $("#promo_result").html("No promo code entered").css("color", "black");;
            } else {
                $("#promo_result").html("Promo code is invalid").css("color", "red");
            };

        });
    });

    //setup second drop down list and actions based on selections
    second_dropdown.onchange = function() {
        //store selected option from second drop down list e.g. name,genre  to an array
        var selected_cat = $('#secondSelect').find(":selected").text();
        var more_info_array = [];
        var $table = $('#demo');

        //iterate over each element in Movie database 
        for (i = 0; i < all_collection.MovieDatabase.length; i++) {
            if (selected_cat == "name") {
                more_info_array.push(all_collection.MovieDatabase[i].name);
            } else if (selected_cat == "genre") {
                more_info_array.push(all_collection.MovieDatabase[i].genre);
            } else if (selected_cat == "director") {
                more_info_array.push(all_collection.MovieDatabase[i].director);
            }
        }
        //clean up the table
        $table.empty();
        //loop through the array of names and output them as a selectable
        for (x in more_info_array) {
            var field = more_info_array[x];
            $table.append(
                `<td > ${field}
                    </td><br>`);
        }

        $('#demo').on("click", "td", function() {

            if (selected_cat == "name") {

                var number1 = $(this).index();
                $(this).toggleClass('clicked');

                var get_price = all_collection.MovieDatabase[number1].price;
                //if the idex is found in array - meaning the item was selected before
                if (number1 in basket_items) {
                    //remove that from the array 
                    var index = basket_items.indexOf(number1);
                    if (index > -1) {
                        basket_items.splice(index, 1);
                    };
                    //rdeduct associated price from total since we are removing the item
                    total = total - get_price;
                } else {

                    basket_items.push(number1);
                    console.log("after ppush to array: " + basket_items);
                    total += get_price;

                    $("#item_price").html("Price: " + total);
                }
            }
        });

        $(document).ready(function() {
            $('input[type="radio"]').click(function() {
                if (first_dropdown.selectedIndex == 0 || second_dropdown.selectedIndex == 0) {
                    alert("Please select from drop down list first");
                    $('input[type="radio"]').prop('checked', false);
                } else {
                    //check if both promotion code and radio box selected which means total of 15% off is calculated
                    var reduced_price = total - (0.1 * total);
                    $("#message_price").html("You got %10 off");
                    $("#item_price").html("Price reduced to : " + reduced_price);
                }
            });
        });
    }
}