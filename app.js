import express from 'express';
import mongoose, {Schema} from 'mongoose';
import jsonParser from 'body-parser';
import errorFunction from './errorFunction';
import {add} from './add';

/* DO NOT REFACTOR THIS CODE */
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

const employeeSchema = Schema({
    name: String,
    jobTitles: {type: [String]},
});

export default db => {

      const adminToken = "admin";
      const app = express();
      app.use(jsonParser.json());

      
      console.log('connected');
      
      app.get('/job', (req, res) => {
          Employee.find({}).exec((err, data) => res.json({data}));
      });      
     
      app.post('/job', (req, res) => {

        const {name, jobTitles} = req.body;

        if(req.headers.authorization !== adminToken){
            res.status(401).json({error:"Auth denied!"})
        }
        else if(!name || !name.length){
            res.status(400).json({error:"invalid input"});            
        }
        else if(!jobTitles){
            res.status(400).json({error:"invalid input"});
        }
        else{
            new Employee({name, jobTitles}).save((err, data) => {
                if(err){
                    res.status(500).json({error:"internal error!"});
                }
                else{
                    const {name, jobTitles} =  data;
                    res.json({name, jobTitles});
                }
            })
        }
      });
      return app;      
}
export const Employee = mongoose.model('Employee', employeeSchema);

/* SERVER CODE TO REFACTOR */
