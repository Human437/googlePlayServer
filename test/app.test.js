const supertest = require('supertest');
const app = require('../app');
const STORE = require('../playStore');
const expect = require('chai').expect;

describe('GET /apps', () =>{
  it('should return an array of apps', ()=>{
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=>{
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length.at.least(1)
        const app = res.body[0];
        expect(Object.keys(app)).to.include.eql(Object.keys(STORE[0]))
      })
  });
  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be by either rating or app');
  });
  it('should be 400 if genres is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'MISTAKE' })
      .expect(400, 'The provided genre is not a valid genre');
  });
  it('should sort by app', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'app' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare app at `i` with next app at `i + 1`
          // if the next app is less than the app at i,
          if (res.body[i + 1].App< res.body[i].App) {
            // the apps were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  it('should sort by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'rating' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare app's rating at `i` with next app's rating at `i + 1`
          // if the next app's rating is greater than the app's rating at i,
          if (res.body[i + 1].Rating> res.body[i].Rating) {
            // the apps's rating were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  it('should return apps that fall under the genre action', ()=>{
    return supertest(app)
      .get('/apps')
      .query({genres: 'action'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=>{
        expect(res.body).to.be.an('array')
        let isActionGenre = true;
        for(let i = 0;i<res.body.least;i++){
          if(res.body[i].Genres !== 'Action'){
            isActionGenre = false;
            break;
          }
        }
        expect(isActionGenre).to.be.true;
      })
  });
  it('should return apps that fall under the genre action and sorted by rating', ()=>{
    return supertest(app)
      .get('/apps')
      .query({genres: 'action', sort: 'rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=>{
        expect(res.body).to.be.an('array')
        let isActionGenre = true;
        for(let i = 0;i<res.body.least;i++){
          if(res.body[i].Genres !== 'Action'){
            isActionGenre = false;
            break;
          }
        }
        expect(isActionGenre).to.be.true;
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare app's rating at `i` with next app's rating at `i + 1`
          // if the next app's rating is greater than the app's rating at i,
          if (res.body[i + 1].Rating> res.body[i].Rating) {
            // the apps's rating were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      })
  });
  it('should return apps that fall under the genre action and sorted by app', ()=>{
    return supertest(app)
      .get('/apps')
      .query({genres: 'action', sort: 'app'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=>{
        expect(res.body).to.be.an('array')
        let isActionGenre = true;
        for(let i = 0;i<res.body.least;i++){
          if(res.body[i].Genres !== 'Action'){
            isActionGenre = false;
            break;
          }
        }
        expect(isActionGenre).to.be.true;
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare app at `i` with next app at `i + 1`
          // if the next app is less than the app at i,
          if (res.body[i + 1].App< res.body[i].App) {
            // the apps were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      })
  });
});