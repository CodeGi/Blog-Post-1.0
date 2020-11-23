//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");    //required const's to export remote modules that u want to use in your app.js
const _ = require("lodash"); // _ <-- means lodash.

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.set('view engine', 'ejs'); //setting up the ejs engine to work so it can find folders in viewS page. make sure it is viewS not view singular.

const postArray = [];//a new empty "container" or  array for our posts

app.get("/" , function(req, res){ //get this page,

   res.render("home" , {startingContent: homeStartingContent ,
   postArrayinsideEJS: postArray}); // render home.ejs and send these ejs tags.
   //{key: value} key: startingContent , aka the content we will pass over to the JS script object. The value is the homeStartingContent.



});




app.get("/about" , function(req, res){ //gets the about page.

   res.render("about" , {aboutContent: aboutContent }); //key and value in both ejs and in the script can be named the same, ppl prefer this naming convention method better.

});

app.get("/contact" , function(req, res){ //GET's the contact page.

   res.render("contact" , {contactContent: contactContent}); //renderContact page, and ejs tag of contactContent. from contact.ejs

});


app.get("/compose" , function(req, res){

   res.render("compose");

});


app.get("/post/:postid", function (req, res) { //NEW Routing a parameter , we want to get /post/: with a parameter of postid
  const requestedName = _.kebabCase(_.toLower(req.params.postid)); //the param of postid will be kebabcased and tolowered for the url to have an exact match on the wording.
  postArray.forEach((asinglePost, i) => { //a modern version of for(i = 0 ; i > postArray.length ; i ++ ){};
    // in our  post array, go through all values or singular posts and store them in this below: //
const storedValue = _.kebabCase(_.toLower(asinglePost.title));
//store in storedValue, which we also kebabCase and to lower, we store inside of .title , .title is from
// below postObject with title, title stores titleOfPostHTML inside of <form> in html inside compose.ejs
if(requestedName === storedValue){ //if requestedName which is if person types /post/aCertainTitle
  //and it is same as storedValue which is also aCertainTitle, then do below: 
res.render("post" , {titleinPostEJS: asinglePost.title , bodyinPostEJS: asinglePost.body});
}//render post page with title and body pertaining to requestedName.

});

});



app.post("/compose" , function(req, res){

const postObject = { //a package containing two values that will hold name form HTML form input from home.ejs
  title: req.body.titleOfPostHTML , //from the form in <input text , name=""
  body: req.body.bodyOfPostHTML} //from the form in <textarea name=""


postArray.push(postObject) //push the packaged objects (holding a {title: value and body: value}) into the [] post array big container.
res.redirect("/"); //go up to "/" which is above with the container that we made.
 });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
