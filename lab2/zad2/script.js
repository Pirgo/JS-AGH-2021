"use strict";

var previousSum = 0;

function numbers(input) {
  let res = 0;
  //leaves only numbers in input joins them in single variable
  input = input.match(/\d+/g);
  if(input == null){
    return 0;
  }
  input = input.map(Number).join("");
  for (let c of input) {
    res += parseInt(c);
  }
  return res;
}

function letters(input) {
  let res = 0;
  //leaves only letters in input joins them in single variable
  input = input.match(/[^0-9]/g);
  if (input == null) {
    return 0;
  }
  input.join("");
  return input.length;
}

function sum(input) {
  let length = 0;
  for (let i in input) {
    if (!isNaN(parseInt(input[i]))) {
      length += 1;
    } else {
      break;
    }
  }
  if (length > 0) {
    input = input.slice(0, length);
    previousSum += parseInt(input);
  }
  return previousSum;
}

// while (true) {
//   var input = window.prompt();
//   if (input == null) {
//     break;
//   }
//   console.log(numbers(input));
//   console.log(letters(input));
//   console.log(sum(input));
// }

var expect = chai.expect;

describe("Only numbers as input", function () {
  it("Returns 3 for 111 numbers()", function () {
    expect(numbers("111")).to.equal(3);
  });
  it("Returns 0 for 111 letters()", function () {
    expect(letters("111")).to.equal(0);
  });
  it("Returns 15 for 6234 numbers()", function () {
    expect(numbers("6234")).to.equal(15);
  });
  it("Returns 0 for 6234 letters()", function () {
    expect(letters("6234")).to.equal(0);
  });
  it("Returns 14 for 0923 numbers()", function () {
    expect(numbers("0923")).to.equal(14);
  });
  it("Returns 0 for 0923 letters()", function () {
    expect(letters("0923")).to.equal(0);
  });
});

describe("Only letters as input", function () {
  it("Returns 0 for gbdet numbers()", function () {
    expect(numbers("gbdet")).to.equal(0);
  });
  it("Returns 5 for gbdet letters()", function () {
    expect(letters("gbdet")).to.equal(5);
  });
  it("Returns 0 for rtyy numbers()", function () {
    expect(numbers("rtyy")).to.equal(0);
  });
  it("Returns 4 for rtyy letters()", function () {
    expect(letters("rtyy")).to.equal(4);
  });
  it("Returns 0 for iuyiyunbfg numbers()", function () {
    expect(numbers("iuyiyunbfg")).to.equal(0);
  });
  it("Returns 10 for iuyiyunbfg letters()", function () {
    expect(letters("iuyiyunbfg")).to.equal(10);
  });
});

describe("First letters then numbers as input", function () {
  it("Returns 11 for gbd65 numbers()", function () {
    expect(numbers("gbd65")).to.equal(11);
  });
  it("Returns 3 for gbd65 letters()", function () {
    expect(letters("gbd65")).to.equal(3);
  });
  it("Returns 9 for r54rr numbers()", function () {
    expect(numbers("r54rr")).to.equal(9);
  });
  it("Returns 3 for r54rr letters()", function () {
    expect(letters("r54rr")).to.equal(3);
  });
  it("Returns 15 for rt55g5 numbers()", function () {
    expect(numbers("rt55g5")).to.equal(15);
  });
  it("Returns 3 for rt55g5 letters()", function () {
    expect(letters("rt55g5")).to.equal(3);
  });
});

describe("First numbers then letters as input", function () {
  it("Returns 11 for 65gbd numbers()", function () {
    expect(numbers("65gbd")).to.equal(11);
  });
  it("Returns 3 for 65gbd letters()", function () {
    expect(letters("65gbd")).to.equal(3);
  });
  it("Returns 9 for 5r4rr numbers()", function () {
    expect(numbers("5r4rr")).to.equal(9);
  });
  it("Returns 3 for 5r4rr letters()", function () {
    expect(letters("5r4rr")).to.equal(3);
  });
  it("Returns 15 for 55g5rt numbers()", function () {
    expect(numbers("55g5rt")).to.equal(15);
  });
  it("Returns 3 for rt55g5 letters()", function () {
    expect(letters("rt55g5")).to.equal(3);
  });
});

describe("Empty string as input", function () {
  it("Returns 0 for '' numbers()", function () {
    expect(numbers("")).to.equal(0);
  });
  it("Returns 0 for '' letters()", function () {
    expect(letters("")).to.equal(0);
  });
});


describe("Testign sum() function", function () {
  it("Returns 0 for 'g45d4' sum()", function () {
    expect(sum("g45d4")).to.equal(0);
  });
  it("Returns 45 for '45d4' sum()", function () {
    expect(sum("45d4")).to.equal(45);
  });
  it("Returns 45 for 'jkk85d4' sum()", function () {
    expect(sum("jkk85d4")).to.equal(45);
  });
  it("Returns 145 for '100jj85d4' sum()", function () {
    expect(sum("100jj85d4")).to.equal(145);
  });
  


});


