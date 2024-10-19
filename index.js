import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [];

app.get("/", (req, res) => {
  res.status(200).render("index.ejs", { posts });
});

app.get("/admin/licenses", (req, res) => {
  res.status(200).render("admin/licenses.ejs");
});

app.get("/admin/styleguide", (req, res) => {
  res.status(200).render("admin/styleguide.ejs");
});

app.get("/all-articles", (req, res) => {
  res.status(200).render("all-articles.ejs", { posts });
});

app.get("/category/culture", (req, res) => {
  const culturePosts = posts.filter(p => p.category === "Culture");
  res.status(200).render("category/culture.ejs", { posts: culturePosts });
});

app.get("/category/lifestyle", (req, res) => {
  const lifestylePosts = posts.filter(p => p.category === "Lifestyle");
  res.status(200).render("category/lifestyle.ejs", { posts: lifestylePosts });
});

app.get("/category/people", (req, res) => {
  const peoplePosts = posts.filter(p => p.category === "People");
  res.status(200).render("category/people.ejs", { posts: peoplePosts});
});

app.get("/category/technology", (req, res) => {
  const technologyPosts = posts.filter(p => p.category === "Technology");
  res.status(200).render("category/technology.ejs", { posts: technologyPosts});
});

app.get("/about", (req, res) => {
  res.status(200).render("about.ejs");
});

app.get("/subscribe", (req, res) => {
  res.status(200).render("subscribe.ejs");
});

app.get("/posts/mindfulness-fast-paced-world", (req, res) => {
  res.status(200).render("posts/mindfulness-fast-paced-world.ejs");
});

app.get("/posts/digital-art-modern-culture", (req, res) => {
  res.status(200).render("posts/digital-art-modern-culture.ejs");
});


app.get("/posts/future-of-smart-homes", (req, res) => {
  res.status(200).render("posts/future-of-smart-homes.ejs");
});


app.get("/posts/ai-transforming-industries", (req, res) => {
  res.status(200).render("posts/ai-transforming-industries.ejs");
});


app.get("/posts/minds-behind-the-machines", (req, res) => {
  res.status(200).render("posts/minds-behind-the-machines.ejs");
});


app.get("/posts/stories-of-community-champions", (req, res) => {
  res.status(200).render("posts/stories-of-community-champions.ejs");
});


app.get("/posts/street-fashion-urban-identities", (req, res) => {
  res.status(200).render("posts/street-fashion-urban-identities.ejs");
});


app.get("/posts/sustainable-living", (req, res) => {
  res.status(200).render("posts/sustainable-living.ejs");
});

app.get("/posts/new", (req, res) => {
  res.status(200).render("posts/new.ejs");
});

app.post("/posts", (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    date: req.body.date,
    description: req.body.description,
    imgSrc: req.body.imgSrc,
    link: `/posts/${req.body.title.toLowerCase().replace(/\s+/g, "-").replace(/:/g, '')}`
  }

  posts.push(newPost);

  res.status(201).redirect(`${newPost.link}`);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.link.includes(req.params.id));
  if (post) {
    res.status(200).render("posts/view.ejs", { post });
  } else {
    res.status(404).render("404.ejs");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.link.includes(req.params.id));
  if (post) {
    res.status(200).render("posts/edit.ejs", { post });
  } else {
    res.status(404).render("404.ejs");
  }
});

app.put("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.link.includes(req.params.id));
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    post.category= req.body.category;
    post.date = req.body.date;
    post.description = req.body.description;
    post.imgSrc = req.body.imgSrc;
    
    res.status(204).redirect(`${post.link}`);
  } else {
    res.status(404).render("404.ejs");
  }
});

app.delete("/posts/:id/delete", (req, res) => {
  const postIndex = posts.findIndex(p => p.link.includes(req.params.id));
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).redirect("/");
  } else {
    res.status(404).render("404.ejs");
  }
});

app.use((req, res) => {
  res.status(404).render("404.ejs");  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
