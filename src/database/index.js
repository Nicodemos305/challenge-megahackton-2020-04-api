const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

const URL_CONNECTION = process.env.URL_CONNECTION_MONGODB || 'mongodb://megahack:megahack2@ds025239.mlab.com:25239/megahack';

class MongoDB {

  constructor(schema) {
    this._connection = null;
    this._collection = schema;
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
        useUnifiedTopology: true
    }, function (error) {
        if (!error) return;
        console.log('Conection fail!', error);
    })
    this._connection = Mongoose.connection;
    this._connection.once('open', () => console.log('database rodando!!'));
  }

  async create(item) {
      return this._collection.create(item);
  }
  async read(item = {}) {
      return this._collection.find(item)
  }
  async update(id, item) {
      return this._collection.updateOne({_id: id}, { $set: item})
  }

  async delete(id) {
      return this._collection.deleteOne({_id: id})
  }

}

module.exports = MongoDB;

