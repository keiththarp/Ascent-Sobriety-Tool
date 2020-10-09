This application uses mysql to get and retreive all user data.

We used the Sequelize ORM to manage the mysql portion of this ap. 

We included a Schema file to create the initial database and used models as an abstraction tthat represents the tables in the database.

We were able to connect and query our database by building associations and using the findOne findAll functions.

We created models for:

-users
-check-ins
and
-resources

The user model handles all information about the user, including username, email, password, Badges, as well as start and goal dates. This model is referenced for the log in function, counter, and accolades. In this table, the id is set as the primary key, which is used to join it to the check in table.

The check in model handles all information regarding the daily journaling function. It is used to create and retreive journal entries in the database. When a user logs in, their ID from the user table correlates to the author id column in the check in table, identifying which entries belong to which user. 

The resources model handles all content for the resources page. It stores the title of the resource, its description, a link, and a category number, which correlates to the mood selected in the daily check in. When a user logs their mood for the day, the page is populated with resources that are appropriate or supportive for how they are feeling.

local storage