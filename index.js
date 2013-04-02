module.exports = comp;

function comp(/* functions */){

  var functions = Array.prototype.slice.call(arguments);

  call.then = then;

  return call;

  function call(/* [firstValue,] callback */){

    var hasFirstValue = arguments.length > 1,
        firstValue    = hasFirstValue ? arguments[0] : undefined,
        callback      = arguments[ hasFirstValue ? 1 : 0 ],
        params;

    function next(i/* [, currentValue ] */){

      params = arguments.length > 1 ? [ arguments[1] ] : [];

      params.push(function(error, newValue){

        if(error) return callback(error, params[0]);

        if( i + 1 >= functions.length ) return callback(undefined, newValue);

        next( i + 1, newValue );

      });

      functions[i].apply(undefined, params);

    }

    hasFirstValue ? next(0, firstValue) : next(0);

  };

  function then(/* [callbacks] */){
    Array.prototype.push.apply(functions, arguments);
    return call;
  }

};
