# Notes

Use this file to document whatever you may want.
Write down development notes, explanations of why you made certain decisions, problems that you found, anything!
Feel free to structure it anyway you want, with as many sections as you wish, make it yours!
But don't forget to commit it with the rest of your code 😄

## Thoughts

While working on the app my approach to solving some issues change a couple of times. In the beginning I tried to alter the queries on GraphQL
in order to fix the bug in SessionsList. I tried to get the id of each task and to make the application update the task in case a task with the same id existed,
so that the tasks would be unique and every time a task would be activated the time would add up to that same task.

While I did not manage to do that with GraphQL, I managed to get the time of the task to start from the last point that it was stopped, but this created a problem as well
because after that the app would still add a new task with the same name, and every task with the same name would start from the point that the first entry was stopped.

When I started adding the WeeklySummary and DailySummary components and their functionality I realized that this wasn't the way to go as it would make sense to keep track of how many times and for how long someone has worked on a task, and instead I summed up the amount of time send on a task during the whole week on the WeeklySummary component. Currently was working on a bug on the DailySummary component as it shows only one entry of each task in a day.

## Implementation

- ### Center and style the global app Loading indicator

  Just added standard css rules to center the Loading indicators, using flex-box.

- ### Create a Timer component, make it tick and put it in place of the static string that shows the elapsed time of the active session

  Created Timer component which saved a time object in state and I used a setInterval in useEffect to setTime on every second which effectively created a ticking timer.
  Used a cleanup function to clear the interval. Replaced the default string on SessionControls with the Timer component.
  WIP: the app complains about setting state on a unmounted component every time the clock is stopped.

- ### Add proper loading indicators

  Having used Auth0 in the past and being aware of its neat Loading component, I created and Loading component using Auth0's spinner and replaced
  the Loading... element across the app with that component.

- ### Add week and daily summaries. You can do it however you want, don't feel forced to do it as charts, and put them whenever you want

  Created a WeeklySummary and a DailySummary component. <br>
  To navigate on the WeeklySummary component the user just has to navigate on the stats tab and click on the bar of the week that he/she wishes to get a summary of.<br>
  In order to test and demo its functionality I created a CreateDummyTasks function which will create an array of dummyTasks identical with the sessions.<br>
  I then proceeded to add this data along with data.sessions on the return of the useMonthChartData and I have left them there in order to be easy to demo the app.<br>
  To make the navigation possible I used the useHistory hook out of react-router-dom in the Chart component. There by clicking on a BarChart I created a handleClick function
  which would get the activeLabel out of the click event, the value of which is the startDate of the week clicked. Then I would filter the sessions to get only the ones with that startDate and would pass them on the WeeklySummary component to be rendered using the state prop that the useHistory hook provides.<br>
  On the WeeklySummary component I would get the filtered data of that specific week using the useLocation hook of react-router. That data then would be passed to the useCreateWeekAndDays hook to be formatted and the data coming back from the hook would be displayed on the component.<br>
  On the WeeklySummary component there is a Link with which the user can see the DailySummary for each day of the week.<br>
  This link would navigate to the DailySummary component passing the week as a param through the link using the useParams hook of react-router.<br>
  In order to make this page work I created the useGetDataWithDay hook which creates identical data as the sessions with the only difference that the startDate is included.<br>
  Then using the week coming from useParams I would filter out the days of the week that the user has chosen, map them to create elements and finally append them to the dom.<br>

- ### Make the list of sessions at the main route scrollable without the page body having to scroll as well
  Just added the overflow-y: scroll rule on the List component and gave it a height.
- ### Fix the bug that prevents the RunningSessionControls to properly update on changes (switchSession, stopSession, etc.)

  While I spent a lot of time trying to fix this I did not figure out the problem and part of it was that I couldn't pint point the issue as I was thinking that it might be
  caused by the way the data are being treated in GraphQL so I spent some time trying to figure out if I could change something there but I couldn't come up with a solution or figure out what cause of the problem was. Came up with a lot of hypothesis about it and tried to follow some but to no avail, like trying to figure out how the update property on the useRunningSession hook works or trying to add onConflict clauses in the mutations in order to make the app just update the task instead of creating a new one, which was wrong anyway as I mentioned above.

- ### Add a way to edit an existing session. Again, feel free to do it in any way you prefer: a modal, an edit route, etc. The only requirement is that it should be possible to trigger it by clicking anywhere on the task row
  I did not look into this one but it seemed doable. If I had the chance I would add an onClick functionality in the form of a modal which would give the ability
  to the user to alter the name of the task using a mutation and/or delete the task using the delete_sessions mutation that already exists.
- ### Feedback
  I really enjoyed this challenge as it provided some real problems that had to be solved and even though I did not manage to solve all of them,
  I learned a lot during the process, and I also got the chance to use GraphQL in a project for the first time, and appreciate it's power and features.
