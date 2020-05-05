const Mongoose =  require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true 
    },
    password: {
      type: String,
      required: true
    },
    code: {
      type: String,
    },
    createdUserAt: {
      type: Date
    },
    confirmatedCodeAt: {
      type: Date
    },
    insertedAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

loginSchema.pre('save', async function(next) {
  var login = this;
  if (login.isModified('password')) {
    login.password = await bcrypt.hash(login.password, 8);
  }
  next();
});

loginSchema.methods.checkPassword = async function checkPassword(password, cb) {
  return bcrypt.compare(password, this.password);
};
// mocha workaround
module.exports = Mongoose.models.login || Mongoose.model('login', loginSchema);

/*
class Login extends Mongoose.Schema {
  constructor() {
    super({
      name: {
          type: String,
          required: true
      },
      phone: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      insertedAt: {
          type: Date,
          default: new Date()
      },
      updatedAt: {
          type: Date,
          default: new Date()
      }
   });
   this.methods.checkPassword = this.checkPassword;
  }

  checkPassword(password) {
    console.log(password, this.password);
    return bcrypt.compare(password, this.password);
  }
}

module.exports = Mongoose.models.login || Mongoose.model('login', new Login);
*/