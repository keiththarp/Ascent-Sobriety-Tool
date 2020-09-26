DATABASE VARIABLES:

User-everything not related journaling/check-ins. Associated to Post model by ID key:

id- unique id for each user. Used to identify that users posts. auto-increment
email
password
name- This is for name/username to display on the welcome page
soberSince- Date yyyy-mm-dd hh:mm:ss format, used for counter
stars- integer, used to keep track of stars, badges, or accomplishments, whichever we decide upon
nextBadge- Date, same format as soberSince, used for the "next goal" countdown timer
createdAt- Date user was initially created at (automatically created)
updatedAt- Date user data was updated at (automatically created)

Post- everything journal/log related, one user may have many rows in this table :

id- unique id for that post, auto-increments
authorId- Links to the id on user page, identifies the user that the post belongs to
body- body text for the check-in/journal entry. Capped at 144 characters
feeling- The number from the 1-5 daily check-in is logged here
hiccup- TinyInt(Boolean), that says whether or not this was a hiccup/divergence day. 0=no, 1=yes. This should allow us to easily pull out all of a users data for  hiccup days.
createdAt- Date entry was initially created at (automatically created)
updatedAt- Date entry data was updated at (automatically created)

Resources- database for content on our Resources page. This approach lends itself to scalability, potentially allowing users to log their own resources in future releases.

id-unique id for that post, auto increment/primary key
title- title or name of resources
link- url, phone number, etc for the resources
category- which category the resource falls under (sobriety specific, mental health, health, etc)
createdAt- Date resource was initially created at (automatically created)
updatedAt- Date resource data was updated at (automatically created)

