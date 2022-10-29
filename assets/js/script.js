// Element selectors

// Global Variables

// Functions/Logic

    // will need something that grabs the current day (using 'moment') and puts it in the header

    // now for hte main content, a BUNCH of stuff needed here
        // using Moment, will be color coding blocks for past hours, the current hour, and the future hours
            // get the current hour, apply a bg color class to it
            // figure out how to refer to all planner hours PRIOR to the current one, apply bg color class to them
            // same thing with all hours AFTER the current one, apply bg color class
        //the main trick here is the logic behind how to grab each of those three specifically
    
    // the next bit is allowing users to enter data into the 'textarea' column of each row, and saving it
        // *a click event on the 'textarea' of each row (probly by a class specific to the column)
        // allow it to stay there even when the focus is turned to a differnet column (but not saved)
        // *another event listener for when the 'save' button is hit, but ONLY for that row
            // heres where youll be doing localstorage, is on this button hit -- but only for the row
            // youll have to save JUST the text in that row in local storage, so itll be the content of the textarea AND the hour it matches
            // deifnitely do the array of objects thing with local storage like you did last week
                // {eventText; ''whatever appts/tasks', hour: [the hour(row) it corresponds to]}
    
    // once localstorage is set up properly, youll also need to set up the 'get' when the page is reloaded
        //this should again be pretty similar to what you did last week

    // i think the toughest part will be deinifing ids/classes on the html elements in order to single them out
    // 