import app from './app';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://veft:123465@ds227035.mlab.com:27035/veft-testing', {
    useMongoClient: true,
  })
  .then(db => {
    const server = app(db);
    server.listen(3000, () => console.log('Server running on port 3000'));
});
