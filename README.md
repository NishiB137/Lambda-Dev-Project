# Lambda-Dev-Project
## Google APP Script - to automate the creation of events in a dedicated calendar from google sheets. 
Being on top of our schedule is something we all want. We can use google calendar for this purpose by creating events/tasks which would help us keep record of our deadlines, help in time-management and being organized. But creating an event for each task with their descriptions, reminders, timings is very time-consuming. It is much easier to simply keep it noted in a google sheet and from there automate the event creation. So to automate this process I have created an apps script.
### How to Use - 
- Go to the repository - https://github.com/NishiB137/Lambda-Dev-Project
- In the repository you will see a file with name ‘Code.gs’  
- Click on the above file  
- On clicking on the file, the app script code will open. Copy the code.  
- Now create/open a Google spreadsheet and fill your details in the following format : 
![Screenshot from 2024-07-15 13-16-57](https://github.com/user-attachments/assets/da63c754-bc93-49d2-93fa-9a3edbf7084d)  
  - The first row is the header row with the titles of each column  
  - Start filling the event details from the second row  
  - The first column has the event/task title   
  - The second column has the event/task description  
  - The third column has the Start date and time and the fourth column has the End date and time.  
  - For the third and fourth column the date and time format should be dd/mm/yyyy 00:00. With the time following the 24 hour clock. Example if an event starts on July 17, 2024 , 6:30 pm. Then write it as 17/07/2024 18:30.  
  - Make sure to keep the 5th column empty (except the header) as it serves a different purpose.  
- Now after filling your data, click on ‘Extensions’ from the menu bar.  
- Then click on Apps Script
  
![Screenshot from 2024-07-15 13-29-03](https://github.com/user-attachments/assets/6edb8b8a-3d99-407e-8d4b-a476a46f8ccc)  
  
- This will now open an Apps Script page in new tab where you can write your script
- It will have some prewritten lines of code. Delete that and paste the code from the repository.
- Save the project with shortcut : Ctrl+S or Cmd+S (in mac)
- Then click on run.
   
![Screenshot from 2024-07-15 13-32-34](https://github.com/user-attachments/assets/393ef7d4-9fe8-4e38-b22b-bd69519d5471)  
  
- On this a dialog will open asking for permission. On giving permission it will run and create a calendar ‘Schedule’ with all your events in the google sheet.  
- After this you will see that the Google sheet has been updated with the Events Added column filled with ‘YES’.  
- To add more events simply add them in the sheet. Again, without filling the fifth column and following the format.
  
![Screenshot from 2024-07-15 13-45-36](https://github.com/user-attachments/assets/62cf64e8-adb2-4678-a73e-31565c8773db)  
- Then go to the Apps Script page and click run.  
- This will add the new events on your calendar (without duplicating the previously added events).  
### Explanation - 
- The function sheetToCalendarEvent reads data from the google sheet and creates events in the calendar accordingly.
  
![Screenshot from 2024-07-15 14-55-32](https://github.com/user-attachments/assets/f366c5b7-e2e6-471f-bc6b-d233132daae9)  
  
- The first part of the function creates the calendar ‘Schedule’ with the given description and colour when using the script for the first time. This is done by checking if the calendar ‘Schedule’ already exists. If it exists then the preexisting calendar is used. If not, then a new calendar is created. It logs on the console about how many matching calendars are found and if none is found then logs the details of the newly created calendar.
 
![Screenshot from 2024-07-15 14-59-56](https://github.com/user-attachments/assets/ef934282-0312-49ec-8447-397676c4b598)
  
- The next part deals with the Google sheet side of things. It gets the active spreadsheet using the prebuilt function ‘SpreadsheetApp.getActiveSheet()’. Then it checks for the last filled row in the sheet and gets the data range and the values from the sheet.
  
![Screenshot from 2024-07-15 15-03-10](https://github.com/user-attachments/assets/c5a39161-a572-4cee-b1d5-22d94de7dd83) 
  
- The last part of the function runs a loop for each row in the sheet. It checks whether the event has been previously added or not by checking the value of the 5th column. If it has been already added then we go on to the next row and if not then the event with the details from the row is created.  
- If the calendar is being created in the current run of the script then the event is created using ‘calendar.createEvent(...)’ and if we are using the previously created calendar then the event is created using ‘calendar[0].createEvent(...)’ .  
- This is because we retrieve the previously created calendar using the ‘getCalendarsByName()’ function which returns an array of the calendars with the name. So to access our calendar we use calendar[0].  
- It creates events with their descriptions included. It also adds a pop up reminder 5 minutes before the event and an email reminder 10 minutes before the event.  
- After adding the event in the calendar it updates the sheet with ‘YES’ against the 5th column of the row containing the event.  
- Since the events created time length lies solely on start-date and time and end-date and time, the time length can be as long as required.  

### Ideas for future - 

- A column for recurrence of the event can be added and accordingly the script can be updated to accommodate this to create new events.  
- Maybe a check or notification can be given for clashing events.  
