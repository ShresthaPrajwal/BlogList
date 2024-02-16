const bcrypt = require("bcrypt");

const usersRouter = require("express").Router();

const User = require("../models/users");

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{title:1,author:1,})
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  console.log(password)
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  if(username.length < 4 ){
    response.status(400).end("Username length less than 4")
    return
  }
  if(password.length < 4 ){
    response.status(400).end("password length less than 4")
    return
  }
  const user = new User({
    username,
    name,
    passwordHash,
  })
  console.log(user)
  const savedUser = await user.save()

  response.status(201).json(savedUser)
});

module.exports = usersRouter