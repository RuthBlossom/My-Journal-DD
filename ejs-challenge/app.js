//app.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//Just make sure that you create a database with that name in your MongoDB instance before trying to connect to it. Keep in mind that MongoDB is not like traditional SQL databases where you define a schema ahead of time. In MongoDB, the database will be created automatically if it doesn't already exist when you attempt to connect to it.

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Replace this line: let posts = []; with:

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (!err) {
      res.render("home", { startingContent: homeStartingContent, posts: posts });
    }
  });
});

//I pass the homeStartingContent variable to the res.render() method when rendering the home.ejs template
app.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    if (!err) {
      res.render('home', { homeStartingContent: homeStartingContent, posts: posts });
    }
  });
});


//By adding the second argument javascript object with key:value. The key is going to be the variable that we'll be able to tap into
// inside the home.ejs & the value is whatever it is that I want to pass over that comes from this current page which
// is the app.js. { homeStartingContent: homeStartingContent }, I'm passing the homeStartingContent variable to the template context so that it can be accessed in my home.ejs template.

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

//In this code, after the post is created while you call post.save(), it will attempt to save the post to the database. If there are no errors (if (!err)), it will then redirect to the home page (res.redirect('/')). This ensures that the redirect only happens after the save operation is complete & successful.
app.post('/compose', function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
});



//app.get("/posts/:postName", function (req, res) {
 // const requestedTitle = _.lowerCase(req.params.postName);

app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;


  //This code retrieves the postId from the route parameters & uses Post.findOne() to find the post with a matching _id. If a matching post is found, it renders the post.ejs template with the title & content of that post then Create the post.ejs Template:.
  Post.findOne({ _id: requestedPostId }, function(err, post) {
    if (!err) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

//So what our loop does currently is it will loop through all the posts inside our post array
// and for each post, it's going to save it into a variable called storeTitle.


  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", { title: post.title, content: post.content });
    }

});

//So now I have the requested title & each stored title Inside my array.
// check for each post whether if the storedTitle matches the requestedTitle we can use an IF statement for that.
//check to see if storedTitle === the requestedTitle.Then in that case I'm going to log match found.
//  that we need to loop through each of the posts, store each of the titles inside a constant called storeTitle then we check if the storedTitle matches with the requested title.
// inside a constant called storeTitle then we check if the storedTitle matches with the requested
// & if so, I log match found.


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
