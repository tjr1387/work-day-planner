// Element selectors


// Global Variables



// Array of all hours (a row for each) for the creation loop
const hoursArray = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

// Grabs the current time and formats the current hour to match the syntax of hoursArray
const currentHour = moment().format('hA');


// Functions/Logic

// This takes in the hour and returns one of three classes (past, present, future) for the bg-color of the textareas
    // May want to use isBefore and isAfter
function assignAreaColor(hour) {
    if (hour === currentHour) {
        return 'present'
    }
}



// Sets the current date to today and formats it
$("#currentDay").text(moment().format('MMMM Do, YYYY'));

// Create the the main content with a loop for each row
    // Lot will go into this because I'll want to assign id/classes here
    // I can probly as I build the table do the coresponding bg-color for textareas here -- maybe a helper function?

for (hour of hoursArray) {
    // Creates the row and its columns, with some bootstrap classes, as well the hour label (from array)
    const rowEl = $('<section>').addClass('row');
        // The last two classes of the hour element I added for positioning
    const hourEl = $('<div>').addClass('hour col-1 text-right pt-3').text(hour);
    const textAreaEl = $('<textarea>').addClass('col-10');
    // Calls the helper function to assign a bg-color to the textarea
    textAreaEl.addClass(`${assignAreaColor(hourEl[0].innerText)}`);
        // The last three classes I added here are to put the icon 'span' in the center of the save element
    const saveEl = $('<div>').addClass('col-1 saveBtn d-flex align-items-center justify-content-center');

    // Creates/adds the disk icon to the save element;
    saveEl.append($('<span>').html('&#128190'));

    // Adds the three columns to the row
    rowEl.append(hourEl, textAreaEl, saveEl);
    // Adds the row to the container
    $('.container').append(rowEl);
}

    // now for hte main content, a BUNCH of stuff needed here
        // using Moment, will be color coding blocks for past hours, the current hour, and the future hours
            // get the current hour, apply a bg color class to it
            // figure out how to refer to all planner hours PRIOR to the current one, apply bg color class to them
            // same thing with all hours AFTER the current one, apply bg color class
        //the main trick here is the logic behind how to grab each of those three specifically
    
    // the next bit is allowing users to enter data into the 'textarea' column of each row, and saving it
        // *another event listener for when the 'save' button is hit, but ONLY for that row
            // heres where youll be doing localstorage, is on this button hit -- but only for the row
            // youll have to save JUST the text in that row in local storage, so itll be the content of the textarea AND the hour it matches
            // deifnitely do the array of objects thing with local storage like you did last week
                // {eventText; ''whatever appts/tasks', hour: [the hour(row) it corresponds to]}
    
    // once localstorage is set up properly, youll also need to set up the 'get' when the page is reloaded
        //this should again be pretty similar to what you did last week

    // i think the toughest part will be deinifing ids/classes on the html elements in order to single them out




