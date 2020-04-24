//Reference Queries

Query the movies collection to:

get all documents
get all documents with writer set to "Quentin Tarantino"
get all documents where actors include "Brad Pitt"
get all documents with franchise set to "The Hobbit"
get all movies released in the 90s
get all movies released before the year 2000 or after 2010

Update Documents
add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"

Text Search
find all movies that have a synopsis that contains the word "Bilbo"

> db.movies.createIndex({ synopsis : 'text'})
> db.movies.find({ $text: { $search: 'bilbo'}}).pretty()

find all movies that have a synopsis that contains the word "Gandalf"

> db.movies.find({$text: { $search: 'Gandalf'}}).pretty()

find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"

> db.movies.find({$text: { $search: 'Bilbo -gandalf'}}).pretty()

find all movies that have a synopsis that contains the word "dwarves" or "hobbit"

> db.movies.find({ $text: { $search: 'dwarves hobbit'}}).pretty()

find all movies that have a synopsis that contains the word "gold" and "dragon"

> db.movies.find({ $text: { $search: '\'gold\' \'dragon\' '}}).pretty()

Delete Documents
delete the movie "Pee Wee Herman's Big Adventure"
delete the movie "Avatar"

> db.movies.remove({"_id" : ObjectId("5e714ff336d21e18cee07938")})


Relationships
Insert the following documents into a users collection


            username : SallySmith
            first_name : "Sally"
            last_name : "Smith"


> db.users.insert({'username' : 'SallySmith', 'first_name': 'Sally', 'last_name':'Smith'})

            username : JimmyHagen
            full_name :
                first : "Jimmy"
                last : "Hagen"

> db.users.insert({'username':'JimmyHagen', 'full_name':{'first':'Jimmy', 'last':'Hagen'}})

Insert the following documents into a posts collection


            username : SallySmith
            title : Passes out at party
            body : Wakes up early and cleans house

> db.posts.insert({'username':'SallySmith', 'title':'Passes out at party', 'body':'Wakes up early and cleans house'})



            username : SallySmith
            title : Buys a House
            body : Living in a new neighborhood now


> db.posts.insert({'username':'SallySmith','title':'Buys a House', 'body':'Living in a new neighborhood now'})


            username : SallySmith
            title : Reports a bug in your code
            body : Sends you a Pull Request


> db.posts.insert({'username':'SallySmith', 'title':'Reports a bug in your code', 'body':'Sends you a Pull Request'})


            username : JimmyHagen
            title : Borrows something
            body : Returns it when he is done


> db.posts.insert({'username':'JimmyHagen','title':'Borrows something', 'body':'Returns it when he is done'})


            username : JimmyHagen
            title : Borrows everything
            body : The end


> db.posts.insert({'username':'JimmyHagen', 'title':'Borrow everything', 'body':'The end'})


            username : JimmyHagen
            title : Forks your repo on github
            body : Sets to private

> db.posts.insert({'username':'JimmyHagen','title':'Forks you repo on github', 'body':'Sets to private'})


Insert the following documents into a comments collection
//Need to see how to retrieve the objectID once it is saved to a variable.


            username : SallySmith
            comment : Hope you got a good deal!
            post : [post_obj_id]



where [post_obj_id] is the ObjectId of the posts document: "Borrows something"

> db.comments.insert({'username':'SallySmith', 'comment':'Hope you got a good deal!','post': ObjectId("5e725e9e51284147f44ec60a")})



            username : SallySmith
            comment : What's mine is yours!
            post : [post_obj_id]



where [post_obj_id] is the ObjectId of the posts document: "Borrows everything"

> db.comments.insert({'username':'SallySmith', 'comment':"What's mine is yours!", 'post': ObjectId("5e725ecb51284147f44ec60b")})



            username : SallySmith
            comment : Don't violate the licensing agreement!
            post : [post_obj_id]



where [post_obj_id] is the ObjectId of the posts document: "Forks your repo on github"

> db.comments.insert({ 'username':'SallySmith', 'comment': "Don't violate the licensing agreement!", 'post':ObjectId("5e725f1251284147f44ec60c")})



            username : JimmyHagen
            comment : It still isn't clean
            post : [post_obj_id]



where [post_obj_id] is the ObjectId of the posts document: "Passes out at party"

> db.comments.insert({'username':'JimmyHagen', 'comment':"It still isn't clean", 'post': ObjectId("5e725da751284147f44ec607")})



            username : JimmyHagen
            comment : Denied your PR cause I found a hack
            post : [post_obj_id]



where [post_obj_id] is the ObjectId of the posts document: "Reports a bug in your code"

> db.comments.insert({'username':'JimmyHagen', 'comment': 'Denied you PR cause I found a hack', 'post': ObjectId("5e725e5551284147f44ec609")})

Querying related collections
find all users

> db.users.find().pretty()

find all posts

> db.posts.find().pretty()

find all posts that was authored by "SallySmith"

> db.posts.find({'username':'SallySmith'}).pretty()

find all posts that was authored by "JimmyHagen"

> db.posts.find({'username':'JimmyHagen'}).pretty()

find all comments

> db.comments.find().pretty()

find all comments that was authored by "SallySmith"

> db.comments.find({'username':'SallySmith'}).pretty()

find all comments that was authored by "JimmyHagen"

> db.comments.find({'username':'JimmyHagen'}).pretty()

find all comments belonging to the post "Reports a bug in your code"

> var ReportsBugId = ObjectId("5e725e5551284147f44ec609")
> db.comments.find({'post':ReportsBugId}).pretty()
