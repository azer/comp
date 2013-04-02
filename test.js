var comp = require("./");

describe('comp', function(){

  var values, currentStep, step1, step2, step3, errorStep,
      expectedError = new Error('I produce an error');

  it('returns a composition of given async functions', function(done){

    var steps = comp(step1, step2, step3);

    steps(values[0], function(error, value){

      expect(error).to.not.exist;
      expect(value).to.equal(values[3]);

      done();

    });

  });

  it('stops the progress if a function produced error', function(done){

    var steps = comp(step1, step2, errorStep, step3);

    steps(values[0], function(error, value){

      expect(error).to.equal(expectedError);
      expect(value).to.equal(values[2]);
      expect(currentStep).to.equal(2.5);

      done();

    });

  });

  it('may not take an initial value', function(done){

    var steps = comp(step0, step1, step2, step3);

    steps(function(error, value){

      expect(error).to.not.exist;
      expect(value).to.equal(values[3]);

      done();

    });

    function step0(callback){
      return callback(undefined, values[0]);
    }

  });


  beforeEach(function(done){

    values    = [{ value1: true }, { value2: true }, { value3: true }, { value4: true }];
    step1     = newStep(1);
    step2     = newStep(2);
    step3     = newStep(3);
    errorStep = newStep(2.5, expectedError);

    done();

  });

  function newStep(n, error){

    return function(value, callback){

      currentStep = n;

      !error && expect(value).to.equal( values[ n - 1 ] );

      process.nextTick(function(){
        callback(error, values[n]);
      });

    }
  }

});
