# reg
Data format is JSON. No database at this moment. This is a work in progress project.

This form is designed to implement a simple purchase with promotion rules written in javascript and jQuery.

Two drop down list enable users to look for their items. When an option from first drop down list selected, the second drop down list will be populated with associate items.


#Promotion rules:
 10% off  for students or senior radio button<br>
 5% off if promotion code: <b>final</b> is entered<br>
 If both radio button and promotion code entered, total of 15% will be reduced from the price and appropriate message and calculation show up on the page. <br><br>
         
        <b>Promotion rules are implemented and tested:</b><br>
        If only one of them selected<br>
        If both selected(whether code is correct or not)<br>
        If wrong code entered<br>
        If no code entered<br>

        <p>By design, “thank you” button will reset the form. </p>
         The following path is implemented 1) select MovieData base 2) select name 3) select movies(see price adds up 4) select radio buttons 5) enter promotion code 6) see the result reduced price and a message <br>
        <p> If you want to see another variation for promotion e.g. only radio button or only promotion code or none , please reset the form first by clicking on thank you button.<br>
