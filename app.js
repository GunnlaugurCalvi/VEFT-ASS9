import express from 'express';
import mongoose, {Schema} from 'mongoose';
import errorFunction from './errorFunction';

/* DO NOT REFACTOR THIS CODE */
export const add = (a, b) => a + b;

export const throws = n => {
  errorFunction();
  return n;
};

export const loop = n => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += add(n, n - 1);
  }
  return sum;
};
/* DO NOT REFACTOR THIS CODE */

/* SERVER CODE TO REFACTOR */
export default db => {

    const employeeSchema = Schema({
        name: String,
        jobTitles: {type: [String]},
      });
      const Employee = db.model('Employee', employeeSchema);      
      const app = express();
      console.log('connected');
      app.get('/', (req, res) => {
          Employee.find({}).exec((err, data) => res.json({data}));
      });

      return app;      
}

/* SERVER CODE TO REFACTOR */
