const { urlencoded } = require('body-parser');
const express = require('express');
const { it } = require('node:test');
const app = express();
const path = require('path');
const port = 8088;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const { v4: uuidv4 } = require('uuid');
// app.get('/',(req,res)=>{
//     res.send("serving Working well!");
// });
app.listen(port, () => {
    console.log("Server running at port: 8088");
});

//IMPLEMENT :GET /posts
// since we dont have any backend to store the get request we create an array
//Also here we r using /posts instead of / (root path) since here our resource is all based on posts

let posts = [
    // here we make posts array as let instead of const since in future we can EDIT this

    {
        // id:'1a',
        id: uuidv4(),
        username: "AjayBhaskar",
        content: 'I LOVE A'
    },

    {
        // id:'2b',
        id: uuidv4(),
        username: 'Akshaya',
        content: 'Im selected for my 1st intern'
    },
    {
        // id:'3c',
        id: uuidv4(),
        username: 'pranav',
        content: 'Bheemla nayak show Adiripoyindi mowas ,go & watch it'
    }
];

//get ->to get data from all posts ->INDEX ROUTE
app.get('/posts', (req, res) => {
    // res.send("serving Working well!");
    res.render('index.ejs', { posts })
});

//222222nd API
// ImPLEMENT :POST /posts
//we r creating a form with user and content  inputs
// and after that we post means we r adding to array

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
})
app.post('/posts', (req, res) => {
    console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });

    res.redirect('/posts');
    //we already know in get we extract form query strings
    //while in posts we extract from body
    // res.send("post requests working");
})

////33333333333rd API    
//IMPLEMENT /posts/:id
//it gives one post which is corresponding to ID

//so add id attribute in above array
//in data beses the id is genrated automatically and they all must be unique
//i.e,, evry post have its unique id

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    //we r using FIND function to find the id in the array
    let post = posts.find((p) => id == p.id);

    console.log(post);
    //so to print hese posts we r creatinh anpother .ejs fiile named SHOW
    res.render('show', { post });

    //   res.send("Request Working ");  
})


///UPTo now its working fine and when we click on SEE IN DETAIL its working fine
//but when we create a new post and in that post if we click on SEE IN DETAIL ,it doesnt give any OUPUT SINCE u didnt even GIVE ID to the NEW pOST

// so we can give id by maintaining a counter varaible so whenever a new post created we assign count variable to it
//and when post DELETED we can decrease counter BUT ITS NOT A GOOD METHOD its a basic one 

//so we r going to use / UUID / packeage (UNIVERSALLY unique IDENTIFER) which will assign unique ids to posts automaitially

//npm intall uuid
//so we r addimng uuidv4() to create a new id while pushing



//////////44444444444444th API  UPDATE ROUTE
//PATCH can be done in HOPSCOTCH.IO and
//in hopscotch.io u can paste the link of url OF SEE IN DEATIL SECTION
// in content-type: change it to form-urlencoded
// and the type the parametres and values u want to type

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // console.log("new content",newContent);
    console.log(post);
    console.log(id);
    // res.send("Patch request working");
    res.redirect('/posts');
})


//BUt for a user it canont be user friendly so we r making edit button
//which can create a new ROUTE for updating
//so create a new view name edit.ejs
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit', { post });
})



////////555555555555555th API DESTROY ROUTE

//we r creating a new route for delete op^n /posts/:id

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    // let post=posts.find((p)=>id==p.id);

    //we r creating array again with all elemtns except the desired deletion id element

    posts = posts.filter((p) => id != p.id);
    res.redirect('/posts');

    // res.send("delete succes");

})