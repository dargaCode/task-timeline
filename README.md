# Readme

## NPM scripts

- Install dependencies:
  - `npm install`
- Run all jest tests:
  - `npm run test`
- Run eslint and prettier:
  - `npm run lint`
- Create a server [localhost:8080](http://localhost:8080/):
  - `npm run start`

## Questionnaire

#### How long did you spend?

Before starting this test, I decided it would be fun to fully flesh it out as a project.

I'd say I'm 20+ hours into working on it at this point. Part of the reason it took so long to get in a "shippable" state as a test is that I front-loaded a lot of tests, mocks, utils, etc.

For the past few months I've been building out [my own homegrown project template](https://github.com/dargaCode/webpack-react-template), using:

- Webpack
- React
- TypeScript
- SCSS
- Jest
- Eslint etc

I build this project on top of my template, and during this project I've been finding more improvements that I need to make to it.

#### What do you like about your implementation?

I enjoyed the design process for this project, and implementing the data logic via TDD.

While writing this project, I treated it as close to production code as I could. I wanted to give examples of the way I work, particularly TDD and high test coverage.

I try to make all of my code easy to read and very reusable. I also incorporated TypeScript, which is a time investment up front for a more stable end result.

Ultimately I think this style of working is representative of how I am as a teammate.

#### What would you change if you were going to do it again?

Of course all of those ways of working take a lot longer than a more quick and dirty prototype, which I think is what's usually intended for tests like this.

One thing that caused a lot of wasted time was that I was overly concerned with rendering the provided Starting Data correctly, so I used it in all of my mocks. That made creating and maintaining the mocks much more complicated and time-consuming than it needed to be. In retrospect, I could have validated my test functionality with much simpler data, and then tested against the Starting Data specifically later on.

I learned this lesson partway through the project, and you can see that my mock data for `TaskScheduler.remove()` are a lot simpler than those for the rest of the class.

One of the first things I could have de-scoped was writing and testing my own SortedList component, which was really just for fun. Same with some of the more thorough test coverage.

I also would have kept my week lighter in terms of other tests and interviews, so I could have started and finished this project sooner.

On the other hand, I usually use Storybook and TDD to build my components, which isn't represented here.

#### How did you make your design decisions?

See Detailed Development Notes below.

#### How would you test this?

I practice TDD when I'm writing production code, so you can see several jest files which give examples of that. I specced out 60, 54 of which are now implemented. In the interest of turning in this test I haven't created tests for my React components yet, but the tests for the logical classes are a good example of my style.

# Detailed Development Notes

I'll try to track my thought process here as I work on it.

When I first received the assignment a couple of days ago, I opened up the assignment and read through it. I've been thinking about it in the background since then.

## Note on naming

It's very confusing to use the term `event` so often, since there will eventually be user events in the app. I'm renaming everything to `task` instead.

## Background

I'm thinking of this problem as basically a google calendar day, but rotated on its side. I've messed around a bit with making lots of overlapping tasks in calendar and seeing how they respond as they are created, modified, and deleted. Calendars create a minimum number of lanes similarly to this timeline.

In the most brute-force solution, I think there would be lots of quadratic time nested loops, as each task is compared to every other task.

I think the challenge here will be to keep the tasks in some kind of indexed, sorted, or memoized state, so they can be easily modified without completely recalculating every position with every change.

## Day 1

After doing some drawings, I see a weird edgecase where adding tasks in a certain order can cause them to take up more rows than necessary.

    [ first task ]           [ second task ]
              [ third task  ]
                  [ fourth task ]

It should be possible to fit these tasks on two lanes only:

    [            ][              ]
              [             ][             ]

I think starting with a pre-sorted list would fix this. If we apply the tasks in order of earliest to latest, they don't cause an unnecessary third lane:

    [ first task ][  third task  ]
              [ second task ][ fourth task ]

### How to schedule tasks in a performant way?

If the initial list of tasks is sorted, we can schedule them into lanes in a relatively straightforward manner:

1. Keep track of the first availability in each lane
   1. (the ending time of the last task currently scheduled)
1. Iterate through all tasks, from earliest to latest
1. For each task, iterate through all existing lanes
1. Schedule the task in the first lane that has an opening.
   1. Update the first availability in that lane to reflect the end time of the new task.
1. If no existing lanes have an availability that is <= the task's start time, create a new lane and schedule the task there
   1. Give that new lane a first availability time at the end of that first task.

So this will work well for the initial set of tasks.

If we want to add/modify/remove tasks after that, we'll have to keep the list sorted as it reflects those changes.

Adding a task:

1. When a new task is added, iterate through the sorted list until we find a task which begins <= the new task's beginning.
1. Insert the new task into the array after the task we found.
   1. This way inserting the task will be as fast as possible, and we'll be able to keep working from a sorted list.
1. Since we know all the tasks sorted before the new task can stay where they are, we only have to reschedule the new task and all the tasks after it.

Deleting a task:

1. Remove it from the sorted list
2. Reschedule all tasks later in the list.

Modifying an existing task would be slightly more complicated since it can move in either direction (or both simultaneously if getting longer or shorter):

1. Keep track of where in the sorted list the task was.
1. Re-insert the modified task into the sorted list.
1. Re-schedule all the tasks whose start times are >= whichever of these two is earlier:
   1. The modified task's new place in the list.
   1. The modified task's old place in the list.

\[This will p task weird holes and inconsistencies from appearing in the list. The unoptimized way would be to just reschedule every task in the list every single time something changes. Depending on the typical size of datasets for this app, doing it the unoptimized way could work fine and cause no performance issues.\]

## Day 2

TDD SortedList via its tests, mocks, and types.
Need to now do the same for TaskScheduler.

## Day 3

Working on tests, mocks, interfaces, comparator for TaskScheduler.

I used this spreadsheet to help myself figure out what results I should be expecting as I scheduled the initial tasks, and added different tasks: [Task Timeline (Google Docs)](https://docs.google.com/spreadsheets/d/1qBlZiCEODFIL_fBinbPOV2eGyP6_jC64faaxF8f_A2s/edit)

As you can see above, I thought that when a task was added/removed/modified, I'd be able to optimize which tasks were rescheduled into lanes. I wanted to only modify the tasks to the right of that time, for an admittedly small potential performance gain.

I'm realizing now, doing that would require keeping track of the openings in each lane at the moment each item is scheduled, so I can start at any point in the timeline, rather than the beginning. \[Think how memoizing helps with nth Fibonacci\]

I think I could do this by building a stack of states, which would eventually be useful for undo/redo. I could maybe also bake the state of the lanes into each task as I schedule it.

For the scope of this project I'll probably end up needing to leave it out. When a task is added/removed/modified, I'll fully clear every task from the lanes and reschedule all of them - for the time being anyway.

## Day 4

All done with the non-react classes, time to make the visuals.

### Brainstorming functionality

**Note: this brainstorm is somewhat different from the structure I ended up with, but I thought it would be valuable to show my thought process when starting out.**

- Overall timeline

  - contains lanes
  - List of Dates (columns)
  - Add task button
    - event - start creating task
  - add/edit form

- Lanes (rows)

  - contains tasks

- Task

  - name (truncated)
  - grid coordinates - start
  - grid coordinates - end
  - special hover?
  - color for editing mode
  - events
    - click / start editing
    - delete

- Add/Edit form
  - Date range selector (click a calendar)
    - start and end date
  - Name input
  - Save / Add button
  - form validation for required options?
  - delete button
  - events
    - submit / create
    - submit / save
    - change start date
    - change end date
    - delete
    - cancel / deselect

**TimelineContainer**

- fetch starting tasks
  - in a real app this would be an api call
  - here it will be loaded from a file
- create a TaskScheduler
  - pass it the starting tasks
- props
  - none
- state
  - scheduled tasks
  - lane count
- children
  - TimelineTable
  - Add/Edit form

**TimelineGrid**

- control zoom / scroll in the future
- convert task start/end/lane to grid coordinates
- props
  - scheduled tasks
  - number of rows / lanes
  - number of columns / dates
- state
  - first date displayed
  - last date displayed
  - task being edited
- children
  - tasks

**Task**

- props
  - color
  - name
  - row
  - start column
  - end column
  - is being edited? (change color)
- state
  - none
- elements
  - name text
- children
  - none
  - maybe delete button in the future
- click
  - begin editing
