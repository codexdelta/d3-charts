#!/usr/bin/env node

let adChart = require('./src');
let fs = require('fs');

let config = new Promise((resolve, reject)=>{
  fs.readFile(process.argv[2], 'utf-8', (err, data)=>{
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(data);
  });
});

let vData = new Promise((resolve, reject)=>{
  fs.readFile(process.argv[3], 'utf-8', (err, data)=>{
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(data)
  })
})

let final = Promise.all([config, vData]);

final
.then((data)=>{
  // write file with svg provide
  
})
.catch((err)=>{
  console.log(err);
})
