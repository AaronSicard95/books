process.env.NODE_ENV = "test";
const request = require("supertest")
const app = require("../app")
const db = require("../db");
const book  = require("../models/book");

describe("Test Book Route", function(){
    beforeEach(async function(){
        await db.query("DELETE FROM books");
        
    })

    test("POST can make book", async function(){
        const response = await request(app)
        .post('/books')
        .send({
            isbn: '32794782',
          amazon_url: "https://taco.com",
          author: "mctest",
          language: "english",
          pages: 1000,
          publisher: "yeah right",
          title: "amazing times",
          year: 2000
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty("isbn");
    })

    test("POST invalid book", async function(){
        const response = await request(app)
        .post('/books')
        .send({
            isbn: '32794782',
          amazon_url: "https://taco.com",
          author: 321789,
          language: "english",
          pages: 1000,
          publisher: "yeah right",
          title: "amazing times",
          year: 2000
        });
        expect(response.statusCode).toBe(400);
    })
})

afterEach(async function () {
    await db.query("DELETE FROM books");
  });

  afterAll(async function () {
    await db.end()
  });