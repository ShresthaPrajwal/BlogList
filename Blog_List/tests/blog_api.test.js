const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/users");
const helper = require("./helper")
const api = supertest(app);
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "Hansel and Gretel",
    author: "William Shakespear",
    url: "facebook.com",
    likes: 3,
    
  },
  {
    title: "The Cockroaches",
    author: "Regene Dollener",
    url: "facebook.com",
    likes: 5,
  },
];
async function NotesInDb() {
  const blogs = await Blog.find({});
  const blogsJSON = blogs.map((blog) => blog.toJSON());
  return blogsJSON;
}
beforeEach(async () => {
  await Blog.deleteMany({});

  let newObj = new Blog(initialBlogs[0]);
  await newObj.save();

  newObj = new Blog(initialBlogs[1]);
  await newObj.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Gandalf's Little Brother",
    author: "Regene Dollener",
    url: "facebook.com",
    likes: 4,
    userId:"65aff1dca92fa766c063f855"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("Gandalf's Little Brother");
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Regene Dollener",
    url: "facebook.com",
    likes: 4,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});
test("blog without url is not added", async () => {
  const newBlog = {
    title: "Gandalf's Little Brother",
    author: "Regene Dollener",
    likes: 4,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await NotesInDb();
  const blogToBeDeleted = blogsAtStart[0];
  
  await api.delete(`/api/blogs/${blogToBeDeleted._id}`).expect(204);

  const blogsAtEnd = await NotesInDb();
  expect(blogsAtEnd).toHaveLength(
    initialBlogs.length-1
  )
  const titles = blogsAtEnd.map(r=>r.title)
  expect(titles).not.toContain(blogToBeDeleted.title)
});

test('a blog can be updated',async ()=>{

  const newBlog = {
    title: "Hansel and Gretel",
    author: "William Shakespear",
    url: "facebook.com",
    likes: 4,
  };
  const blogsAtStart = await NotesInDb();
  const blogToBeUpdated = blogsAtStart[0];
  console.log(blogToBeUpdated)
  await api.put(`/api/blogs/${blogToBeUpdated}`).send(newBlog).expect(204);

  const blogsAtEnd = await NotesInDb();
  const updatedBlog = blogsAtEnd[0];
  console.log(updatedBlog)
  expect(updatedBlog.likes !== blogToBeUpdated.likes)
  
})

describe('when there is initially one user in db',()=>{
  beforeEach(async ()=>{
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })  

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('an invalid users cannnot be created',async()=>{
    const usersAtStart = await helper.usersInDb();
    const newUser ={
      username: 'aaa',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close();
});

