# Development Notes

I'll try to track my thought process here as I work on it.

When I first received the assignment a couple of days ago, I opened up the assignment and read through it. I've been thinking about it in the background since then.

## Note on naming

It's very confusing to use the term `event` so often, since there will eventually be user events in the app. I'm renaming everything to `task` instead.

## Background

I'm thinking of this problem as basically a google calendar day, but rotated on its side. I've messed around a bit with making lots of overlapping tasks in calendar and seeing how they respond as they are created, modified, and deleted. Calendars create a minimum number of lanes similarly to this timeline.

In the most brute-force solution, I think there would be lots of quadratic time nested loops, as each task is compared to every other task.

I think the challenge here will be to keep the tasks in some kind of indexed, sorted, or memoized state, so they can be easily modified without completely recalculating every position with every change.

## Hour 1

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

## Hour ~2

TDD SortedList via its tests, mocks, and types.
Need to now do the same for TaskScheduler.

## Hour ~3-4

Working on tests, mocks, interfaces, comparator for TaskScheduler.

I used this spreadsheet to help myself figure out what results I should be expecting as I scheduled the initial tasks, and added different tasks: [Task Timeline (Google Docs)](https://docs.google.com/spreadsheets/d/1qBlZiCEODFIL_fBinbPOV2eGyP6_jC64faaxF8f_A2s/edit)

As you can see above, I thought that when a task was added/removed/modified, I'd be able to optimize which tasks were rescheduled into lanes. I wanted to only modify the tasks to the right of that time, for an admittedly small potential performance gain.

I'm realizing now, doing that would require keeping track of the openings in each lane at the moment each item is scheduled, so I can start at any point in the timeline, rather than the beginning. \[Think how memoizing helps with nth Fibonacci\]

I think I could do this by building a stack of states, which would eventually be useful for undo/redo. I could maybe also bake the state of the lanes into each task as I schedule it.

For the scope of this project I'll probably end up needing to leave it out. When a task is added/removed/modified, I'll fully clear every task from the lanes and reschedule all of them - for the time being anyway.
