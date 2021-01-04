const express = require('express');
const morgan = require('morgan');
const store = require('./playStore');

const app = express();

app.use(morgan('dev'))

app.get('/apps',(req,res)=>{
  let {sort, genres} = req.query;
  let STORE = store;
  
  if(sort){
    sort = sort.toLowerCase();
    if(!['rating','app'].includes(sort)){
      return res.status(400).send('Sort must be by either rating or app');
    }
  }
  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
  if (genres){
    genres = genres.toLowerCase();
    genres = genres[0].toUpperCase() + genres.substring(1);
    if(!validGenres.includes(genres)){
      return res.status(400).send('The provided genre is not a valid genre')
    }
  }

  if (sort) {
    sort = sort[0].toUpperCase() + sort.substring(1);
    if(sort === 'App'){
      STORE.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }else{
      // Switched 1 and -1 so that apps with higher ratings would appear first
      STORE.sort((a, b) => {
        return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
      });
    }
  }

  if (genres){
    STORE = STORE.filter(app=> app.Genres === genres)
  }

  res.json(STORE);
})

app.listen(8000, ()=>{
  console.log('Server is started on Port 8000')
})