const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

const URL_CONNECTION = process.env.URL_CONNECTION_MONGODB || 'mongodb://megahack:megahack2@ds331135.mlab.com:31135/megahack';

class MongoDB {

  constructor(schema) {
    this._connection = null;
    this._schema = schema;
    this.connect();
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Conectado') return state;

    if (state !== 'Conectando') return state;

    await new Promise(resolve => setTimeout(resolve, 5000));

    return STATUS[this._connection.readyState];
  }

  connect() {
    Mongoose.connect(URL_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }, function (error) {
        if (!error) return;
        console.log('Conection fail!', error);
    })
    this._connection = Mongoose.connection;
    this._connection.once('open', () => console.log('database rodando!!'));
  }

  async findById(_id) {
    return this._schema.findById(_id);
  }

  async create(item) {
      return this._schema.create(item);
  }
  async read(item = {}) {
      return this._schema.find(item)
  }
  async update(id, item) {
      return this._schema.updateOne({_id: id}, { $set: item})
  }

  async delete(id) {
      return this._schema.deleteOne({_id: id})
  }

  get schema() {
    return this._schema;
  }

}

module.exports = MongoDB;

