# Development Notes
I'll try to track my thought process here as I work on it.

When I first received the assignment a couple of days ago, I opened up the assignment and read through it. I've been thinking about it in the background since then.

## Background
I'm thinking of this problem as basically a google calendar day, but rotated on its side. I've messed around a bit with making lots of overlapping events in calendar and seeing how they respond as they are created, modified, and deleted. Calendars create a minimum number of lanes similarly to this timeline.

In the most brute-force solution, I think there would be lots of quadratic time nested loops, as each event is compared to every other event.

I think the challenge here will be to keep the events in some kind of indexed, sorted, or memoized state, so they can be easily modified without completely recalculating every position with every change.

## Hour 1
After doing some drawings, I see a weird edgecase where adding events in a certain order can cause them to take up more rows than necessary.

    [ first event ]          [ second event ]
              [ third event ]
                   [ fourth event ]

It should be possible to fit these events on two lanes only:

    [             ][              ]
              [             ][              ]

I think starting with a pre-sorted list would fix this. If we apply the events in order of earliest to latest, they don't cause an unnecessary third lane:

    [ first event ][ second event ]
              [ third event ][ fourth event ]

### How to schedule events in a performant way?

If the initial list of events is sorted, we can schedule them into lanes in a relatively straightforward manner:

1. Keep track of the first availability in each lane
    1. (the ending time of the last event currently scheduled)
1. Iterate through all events, from earliest to latest
1. For each event, iterate through all existing lanes
1. Schedule the event in the first lane that has an opening.
    1. Update the first availability in that lane to reflect the end time of the new event.
1. If no existing lanes have an availability that is <= the event's start time, create a new lane and schedule the event there
    1. Give that new lane a first availability time at the end of that first event.

So this will work well for the initial set of events.

If we want to add/modify/remove event times after that, we'll have to keep the list sorted as new items are added and removed.

Something like:
1. When a new event is added, iterate through the sorted list until we find an event which begins after the new event ends.
1. Insert the new event right before the event we found.
    1. This way inserting the event will be as fast as possible, and we'll be able to keep working from a sorted list.
1. Since we know all the events sorted before the new event can stay where they are, we only have to reschedule the new event and all the events after it.

When deleting an event:
1. Remove it from the sorted list
2. Reschedule all events later in the list.

Modifying an existing event would be slightly more complicated since it can move in either direction (or both simultaneously if getting longer or shorter):
1. Keep track of where in the sorted list the item was.
1. Re-insert the modified event into the sorted list.
1. Re-schedule all the events whose start times are >= whichever of these two is earlier:
    1. The modified event's new place in the list.
    1. The modified event's old place in the list.

\[This will prevent weird holes and inconsistencies from appearing in the list. The unoptimized way would be to just reschedule every event in the list every single time something changes. Depending on the typical size of datasets for this app, doing it the unoptimized way could work fine and cause no performance issues.\]






















