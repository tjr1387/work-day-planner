# Week 5 Challenge
#### Creating a day planner using third party APIs


## Description
This page is a 'day planner' where the user can enter and save various tasks/plans for each hour of the work day. It has access to the current date, and is color-coded to reflect what the current hour is. It utilizes MomentJS for time related functions and Bootstrap/Google Fonts for styling.

## Installation

N/A

## Usage

This work day planner is pretty self-explanatory. The user is presented with the current date and a table-like layout where each row represents an hour of the work day (9AM-5PM). There is a field in which to enter plans, appointments or other tasks and then save them by clicking the button-like blue tab to its right. All saved tasks are reflected in local storage, and will persist upon reload. Also, the text areas are color coded to reflect the current hour -- past hours are grey, the current hour is red and future hours are green. If the user clears/empties an entry, that will also be reflected/persisted in local storage.

Screenshot(s): ![The full page, taken at 4-something PM](/assets/my-mockup.png?raw=true)

Link to live site: 


## Flaws/Comments
While the page functions as it should, the code structure is probably not the most efficient in some spots. Unlike previous weeks, I didn't abstract out a number of smaller helper functions, so the event listener block is quite large. When it came to wrestling with all the different possiblites of local storage, they're pretty well handled, but I'm sure there are more elegant solutions to doing so. Persisting local storage was especially goofy, as I wound up looping through each row, and within that, looping through all of local storage. Thankfully there's only nine hours of text (max) to account for, so it's not a big deal here. I tried to use as much of the pre-written styling as I could (I also added a bunch of bootsrap classes, mainly for spacing) in order to replicate the mock up. I'd imagine some people would want to put their own personal style / color scheme to this, but as an uncreative mind, I just wanted the code to work properly. I utilized jQuery, Bootstrap and Google Fonts, but did _not_ use Font Awesome as far as I'm aware. I _think_ the idea was to use something from it for the save icon, however I decided to use a UTF icon instead. Also, there is a warning about 'Expect-CT' header being deprecated (it's not used anymore) but I couldn't find what was causing it.


## Credits

#### Google Fonts (for 'Open Sans')
#### Bootstrap
#### jQuery (so fun and _so_ much nicer than vanilla JS for element stuff)

## License

MIT License (as referred to in the repo)
