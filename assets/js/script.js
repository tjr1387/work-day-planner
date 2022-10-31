// Global Variables

    // Array of all hours (a row for each) for the creation loop
const hoursArray = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

    // Grabs the current time and formats the current hour to match the syntax of hoursArray
const currentHour = moment().format('hA');


// Function definition(s)

// Helper function for the creation loop; takes in the hour and returns one of the three classes (past, present, future) for the bg-color of the textareas
    // Big thanks to the 'isBefore' and 'isAfter' methods of Moment!
function assignAreaColor(hour) {
    const loopHour = moment(hour, 'hA');
    const currHour = moment(currentHour, 'hA');
    if (loopHour.isBefore(currHour)) {
        return 'past'
    } else if (loopHour.isAfter(currHour)) {
        return 'future'
    } else {
        return 'present'
    }
}


// Main logic

// Sets the current date to today and formats it, plopping it into the header element
$("#currentDay").text(moment().format('MMMM Do, YYYY'));

// This loop builds the main content row by row, adding styling along the way
for (hour of hoursArray) {
    // Creates the row and its columns, with some bootstrap classes, as well the hour label (from array)
    const rowEl = $('<section>').addClass('row hour-row');  // giving this a seoond class for later query selection (selecting ALL with class 'row' seems like bad practice)
        // The last two classes of the hour element I added for positioning
    const hourEl = $('<p>').addClass('hour col-1 text-right pt-3').text(hour);
    const textAreaEl = $('<textarea>').addClass('col-10');
        // The last three classes I added here are to put the icon 'span' in the center of the save element
    const saveEl = $('<div>').addClass('col-1 saveBtn d-flex align-items-center justify-content-center');

    // Calls the helper function to assign a bg-color to the textarea
    textAreaEl.addClass(`${assignAreaColor(hourEl[0].innerText)}`);
    // Creates/adds the disk icon to the save element;
    saveEl.append($('<span>').html('&#128190').addClass('saveIcon'));
    // Adds the three columns to the row
    rowEl.append(hourEl, textAreaEl, saveEl);
    // Adds the row to the container
    $('.container').append(rowEl);
}


// On page (re)load, bring up local storage
const loadedPlans = JSON.parse(localStorage.getItem("plans"));

// If any exists, load up (persist) the elements with the text from stored plans
if (loadedPlans) {
    // Select an array of all the hour rows
    const hourRowArray = $('.hour-row');
    for (hourRow of hourRowArray) {
        // Grabbing the relevant children (the hour's text and the textarea element)
        const childHour = hourRow.children[0].innerText;
        let childTextEl = hourRow.children[1];
        // Loop through the now-parsed object array from storage
        for (storageObj of loadedPlans) {
            // If there is a stored entry for this particular hour, set the textarea to the corresponding value
            if (childHour === storageObj.time) {
                childTextEl.value = storageObj.text;
            }
        }
    }
}


// Event listener for the 'save this textarea's value' click event
    // It's on the parent (row), but only activates when the save button (or it's child icon) is clicked
    // It then jumps back into the parent (row) to grab the hour and textarea's value; then saves them to localStorage
    // Because a user may want to erase a plan, this _will_ save empty textareas in storage; not ideal, but oh well, there's a maximum length of nine for the storage array
$('.row').click(function (event) {
    const saveText = event.target;
    if (saveText.matches('.saveBtn') || saveText.matches('.saveIcon')) {
        // Grabs the hour and the plan text
        const hour = event.currentTarget.children[0].innerText;
        const planText = event.currentTarget.children[1].value;
        // Brings up local storage
        const storedPlans = JSON.parse(localStorage.getItem("plans"));
        // Builds an object to be put into storage (though it won't get used in the 'replace' case ahead..)
        const entry = {time: hour, text: planText}
        if (!storedPlans) {
            // If there's nothing in local storage, store the object we just built in an array
            localStorage.setItem("plans", JSON.stringify([entry]));
        } else {
            let isReplaced = false;     // Set a flag to be toggled if theres an entry for the hour
            // If there is storage, look through its array to see if there's already an entry (object) for this particular hour
            for (let planObj of storedPlans) {
                // If this hour already has an entry, we'll overwrite it; just replace the text value with the current one; don't need the object we built
                if (planObj.time === hour) {
                    planObj.text = planText;
                    isReplaced = true;      // Change the flag to reflect that an entry was found and replaced
                }
            }
            // If the current time wasn't found (therefore no update/replace was made), then just push the object to the storage array
            if (!isReplaced) {
                storedPlans.push(entry);
            }
            // Put our changed array (whether we pushed to it OR changed an existing entry) back into localStorage
            localStorage.setItem("plans", JSON.stringify(storedPlans));
        }
    }
});
