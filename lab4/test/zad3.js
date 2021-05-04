//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?file=../zad2', function () {
      it('respond with "directory"', function (done) {
            server
                  .get('/submit?file=../zad2')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "Directory", done);
      });

      it('respond with "File doesnt exist"', function (done) {
        server
              .get('/submit?file=server3.js')
              .expect('Content-Type', /text\/plain/)
              .expect(200, "File doesnt exist", done);
  });
});