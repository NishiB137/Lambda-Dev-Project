//function to create events in google calendar from google sheets using google appscripts
//event length can be as much as required only restriction is to follow the date and time format
//function creates a calender for the first time only then reuses the same calendar
function sheetToCalendarEvent() {
  var calendar = CalendarApp.getCalendarsByName('Schedule');
  console.log('Found %s matching calendars.', calendar.length);
  var cal_pre_exist = 1;
  if(calendar.length == 0){      
    cal_pre_exist = 0;
    var calendar = CalendarApp.createCalendar('Schedule', 
    { color: "#D8BFD8"});
    calendar.setDescription('Calendar for scheduling all my tasks and appointments')
    console.log('Created the calendar "%s", with the ID "%s".',
    calendar.getName(), calendar.getId());
  }
  var sheet = SpreadsheetApp.getActiveSheet();
  var num_of_rows = sheet.getLastRow() - 1;
  var range_of_data = sheet.getRange(2,1,num_of_rows,5); //data range from 2nd row to last filled row and from 1st to 5th column
  var values = range_of_data.getValues(); //retrieve values from the data range
  var row_num = 2;
  for(var row of values) {     //taking data from the sheet and creating events
    var task = row[0];
    var desc = row[1]
    var start = row[2];
    var end = row[3];
    if(row[4] != "YES"){
      if(cal_pre_exist == 1){
        var event = calendar[0].createEvent(task,start,end,{description: desc});
      }
      else{
        var event = calendar.createEvent(task,start,end,{description: desc});
      }
      event.addPopupReminder(5);  //setting up reminders 5 min and 10 min prior to event
      event.addEmailReminder(10);
      sheet.getRange(row_num,5).setValue('YES'); //as the event is added, it is marked as YES in the google sheet
    }
    row_num ++;
  }
}
