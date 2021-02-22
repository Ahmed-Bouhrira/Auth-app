var { User } = require("../models/users");

module.exports = {
  read: (user, callbacks) => {
    if(user.type==="admin"){
      User.find().exec(callbacks);
    }else{
      User.find({type:"admin"}).exec(callbacks);
    }
   
  },
  update: (id, obj, callback) => {
    User.findOneAndUpdate({ _id: id }, obj, callback);
  }
};
