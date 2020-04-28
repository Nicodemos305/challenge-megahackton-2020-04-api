module.exports = () => {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    const controller = {};
    try{
       controller.createUser = (req, res) => res.status(201).json(create(req, controller, User));
    }catch(e){
        console.log(e);
        controller.createUser = (req, res) => res.status(500).json(controller);
    }
    return controller;
  }

  function create(req, controller, User){
    const user = new User(req.body);
    user.save(req.body);
    console.log(req.body);
    return controller;
  }