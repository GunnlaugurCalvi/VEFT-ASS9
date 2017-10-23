import express from 'express';
import mongoose, {Schema} from 'mongoose';
import jsonParser from 'body-parser';
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
const employeeSchema = Schema({
    name: String,
    jobTitles: {type: [String]},
});

export default db => {

      const app = express();
      app.use(jsonParser.json());

      
      console.log('connected');
      
      app.get('/job', (req, res) => {
          Employee.find({}).exec((err, data) => res.json({data}));
      });      
     
      app.post('/job', (req, res) => {
        const {name, jobTitles} = req.body;
        console.log('IM AM HERE MANE WTFFFF400');
        if(!name || !name.length){
            res.status(400).json({error:"invalid input"});
            console.log('IM AM HERE MANE WTFFFF401');
            
        }
        else if(!jobTitles){
            res.status(400).json({error:"invalid input"});
            console.log('IM AM HERE MANE WTFFFF402');
            
        }
        else{
            new Employee({name, jobTitles}).save((err, data) => {
                if(err){
                    res.status(500).json({error:"internal error!"});
                }
                else{
                    console.log('IM AM HERE MANE WTFFFF200');
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
