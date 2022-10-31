// Element selectors


// Global Variables

    // Array of all hours (a row for each) for the creation loop
const hoursArray = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

    // Grabs the current time and formats the current hour to match the syntax of hoursArray
const currentHour = moment().format('hA');


// Functions/Logic

// Helper function for the build loop; takes in the hour and returns one of three classes (past, present, future) for the bg-color of the textareas
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


// Sets the current date to today and formats it, plopping it into the header element
$("#currentDay").text(moment().format('MMMM Do, YYYY'));

// This loop builds the main content row by row, adding styling along the way
for (hour of hoursArray) {
    // Creates the row and its columns, with some bootstrap classes, as well the hour label (from array)
    const rowEl = $('<section>').addClass('row');
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

// Load up (persist) the elements with text from localStorage
    // Once this is done, I am done!


// Event listener for the 'save this textarea's value' click event
    // It's on the parent (row), but only activates when the save button (or it's child icon) is clicked
    // It then jumps back into the parent (row) to grab the hour and textarea's value; then saves them to localStorage
$('.row').click(function (event) {
    const saveText = event.target;
    if (saveText.matches('.saveBtn') || saveText.matches('.saveIcon')) {
        // Grabs the hour and the plan text
        const hour = event.currentTarget.children[0].innerText;
        const planText = event.currentTarget.children[1].value;
        // Everything that follows will only run if there's actually text in the textarea
        if (planText) {
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
    }
});
