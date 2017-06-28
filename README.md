## Bucket List

Bucket list is a single-page application that allows users to track goals they would
like to achieve and experiences they would like to have in their lifetime.

## Technologies Used

Bucket List is basically a MEAN (Mongo, Express, Angular, NodeJS) without the 'A' -- Angular.

The backend database is MongoDB, and the API server is a Node/Express application
that enables CRUD and authorization functions.

In addition to that stack, we used the [DataTables jQuery plugin](http://datatables.net).

The backend server is hosted on Heroku, and the front end is hosted on Github Pages.
See below for links to deployed front and back end servers as well as
links to front and back end repositories.

## Approach

### Approach to implementing CRUD and UI functions for bucket list items

We used the DataTables, a jQuery plugin that helps developers display and update
table data. We chose it because it is widely used enough to be stable and well-supported,
and it built-in extra features we would not have had time to implement, such as search
and sort.

DataTables also has its own API. Because of this, we did not have a completely
traditional approach to building a model/route/controller set to handle crud functions.
For some of these functions, we were using the DataTables API to both get and set
data a user sees when they log in.

We briefly considered having DataTables emit all of a user's bucket list items for
each request and storing it as one big blob in Mongo, but ultimately we took a row-by-row
approach where each bucket list item has an individual database record.

### Development/Team Approach

We held daily standups in the morning to coordinate and divide tasks. To cut down
on the chances of merge conflicts, we created long issue queues for the front and back
end repositories. Each new feature branch was named after its issue, for example: issue#11.
Referencing the issue in our commits and pull requests gave us a clear sense of which
commits applied to which desired features and bugfixes. As an example,
look at the following issue, a [bugfix for the UI](https://github.com/squad-three/squad-three-front-end/issues/51)
The issue clearly shows commits in progress towards solving the problem and
documents the merge of the feature branch into development.

We used Slack extensively to communicate in the evenings when we weren't physically together.
We might have been Slacking each other at 1AM a few times, but no team members will
confirm or deny this.

## Challenges

Libraries giveth, and libraries take away. While DataTables significantly sped up the
creation of our UI, we spent too much time struggling with an add-on to the library
which would have allowed in-row editing of bucket list items.

Once we abandoned that approach, we took a more traditional approach, popping up a form
to allow users to create and edit bucket list items.

## Instructions for installing dependencies:

Clone this repository and run `npm install`.
Install DataTables and its default styles at the command line:

```
npm install datatables.net    # Core library
npm install datatables.net-dt # Styling

```

## Bucket List Documentation: Bucket List Wiki

We have [an extensive wiki](https://github.com/squad-three/squad-three-back-end) documenting our approach to authorization, our API, checklists, and more. We would like to call out the following specific
planning documents and documentation:

## API Documentation

[Link to API Documentation](https://github.com/squad-three/squad-three-back-end/wiki/api-intro)

## User Stories

[Link to User Stories](https://github.com/squad-three/squad-three-back-end/wiki/User-Stories)

## Entity Relationship Diagram

[Link to Entity Relationship Diagram (ERD)](https://github.com/squad-three/squad-three-back-end/wiki/ERD)

## Wireframes

[Link to our wireframes](https://github.com/squad-three/squad-three-back-end/wiki/Wireframes)

## Links to Deployed Front and Back End

[A link to the deployed front-end app](https://squad-three.github.io/squad-three-front-end/)
[A link to the repo for your back-end](https://enigmatic-beyond-36967.herokuapp.com/)

## Links to Front And Back End Repositories

[A link to the front end repository](https://github.com/squad-three/squad-three-front-end)
[A link to the back end repository](https://github.com/squad-three/squad-three-back-end)

## Team

Bucket List was built by Alex Constantine, Eric Scace, and Lisa Williams as a team project undertaken during WDI18 at General Assembly Boston.
