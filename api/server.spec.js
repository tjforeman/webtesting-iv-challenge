const request=require('supertest')

const server=require('./server.js')

const db=require('../data/dbConfig.js');

describe('server', () => {
    it('sets the env to testing',() =>{
        expect(process.env.DB_ENV).toBe('testing');
    })

    it('should return a 200 when connected to the api',() =>{
        return request(server).get('/').expect(200)
    })

    it('should return the message Its working!!!',() =>{
        return request(server).get('/').then(res =>{
            const {body} =res;
            expect(body.message).toBe('Its working!!!!')
    })
 })
 describe('/get students',() =>{
     ('it should return a 200 status code if the students are being returned',()=>{
        return request(server).get('/students').expect(200) 
     })

     it('should return a list of students', async () =>{
        
        const students = await db('students');

        expect(students).toHaveLength(0);
     })
 })
describe('post students', () =>{
    afterEach(async () => {
        await db('students').truncate();
      });

    it('should be able to add a new student', async () =>{
        await db('students').insert({name:'Goyle'});
  
        const students = await db('students');
  
        expect(students).toHaveLength(1);
    })

    it('should add two new students', async () => {
        await db('students').insert({name:'Goyle'});
        await db('students').insert({name:'Crabbe'});
  
        const students = await db('students');
  
        expect(students).toHaveLength(2);
    })
    
})
describe("the delete endpoint", () => {
    afterEach(async () => {
        await db('students').truncate();
      });

    it('deletes the student and responds with 200 status', async () => {
        await request(server)
        .post("/students")
        .send({name:'Cho'});

        const res = await request(server).delete('/students/1');

        expect(res.status).toBe(200);
      })
      
      it('returns a 400 status if the ID doesnt exist', async () => {
        await request(server)
        .post("/students")
        .send({name:'Dean'});

        const res = await request(server).delete('/students/26');

        expect(res.status).toBe(400);
    })
    it('returns a 400 status if nothing is sent', async () => {
        await request(server)
        .post("/students")
  
          const res = await request(server).delete('/students/1');
  
          expect(res.status).toBe(400);
      })
})
})