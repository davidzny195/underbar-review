(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n <= 0 ? [] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'number') {
      for (var i = 0; i < collection; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];
    _.each(collection, function(ele, idx) {
      if (test(ele, idx)) {
        filtered.push(ele);
      }
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // You can safely ignore the isSorted parameter in your solution!
    // The isSorted parameter is only included for consistency with Underscore's
    // version of uniq, and its functionality is not specifically tested here.

    // The iterator specifies what _.uniq uses to decide if an item is a
    // duplicate or not. _.uniq should use an item's transformed value, the result
    // of invoking iterator on the item, to determine whether or not the original
    // item is unique in the collection so far.

    // If there is no defined iterator, _.uniq should default to use
    // an item's original value to determine uniqueness.
    var results = [];
    var finalValues = [];
    _.each(array, function(val, idx, array) {

      var finalValue = iterator ? iterator(val) : val;
      if (!finalValues.includes(finalValue)) {
        finalValues.push(finalValue);
        results.push(val);
      }
    });
    return results;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(val, idx, collection) {
      results.push(iterator(val, idx, collection));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Since JavaScript object properties are not stored in any particular order,
  // we cannot reliably anticpate what property will be accessed first during
  // property iteration. Given this, it is not necessary for your solution
  // to be able to handle the case of an object being passed in with no
  // initial accumulator.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
    // TIP: To support both arrays and objects, try re-using each() here
    // Check for two scenarios: with accumulator and without and set collection[0] as accumulator
    // accumulator could be 0 or false  so can't use !accumulator
    _.each(collection, function(item, idx, collection) {
      if (idx === 0 && accumulator === undefined) {
        // need index = 0, as we only need to set iterator once in the beginning -> prevents accumulator from becoming undefined later
        accumulator = item;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };
// undefined, 1, undefined, 1, undefined

  // --------------------
  // ! END OF PART ONE !
  // --------------------
  //
  // Congrats! You've reached the end of Underbar Part 1!
  //
  // This means that you should return to Learn and move on to the next lesson:
  //    - Learn Unit: Debugging
  //    - Learn Lesson: Before Moving On
  //
  // CAUTION:
  //
  //   - Do not proceed on to Underbar Part 2 (below) without reading the
  //     slides on Scopes & Closure
  //
  // --------------------


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // check for iterator vs no iterator
    return _.reduce(collection, function(isTrue, item) {
      if (iterator) {
        if (!isTrue) {
          // checks if previous value was false
          return false;
        }
        return iterator(item) ? true : false;
      } else {
        return item ? true : false;
      }
    // pass in accumulator so reduce always runs iterator
    }, true);

    // needs to return true for empty collection
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    return !_.every(collection, function(item) {
          // needs to set default for no iterator
      return iterator ? !iterator(item) : !item;
    });
    // TIP: There's a very clever way to re-use every() here.
  };
  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // obj is extended
    _.each(arguments, function(object) {
      _.each(object, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(object) {
      _.each(object, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var called = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!called) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        called = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // create cache
    var cache = {};
    // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
    return function() {
      var n = JSON.stringify(arguments);
      // check if cache[func] exists
      if (cache[n]) {
        return cache[n];
        // else return new func results and add to cache
      }
      var result = func.apply(this, arguments);
      cache[n] = result;
      return result;

    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
  _.delay = function(func, wait) {
    // need to not include first 2 args
    var args = Object.values(arguments).slice(2);
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // needs to return different new array without altering array argument
    // make a copy of an array
    var copy = _.map(array, function(x) {
      return x;
    });
    // iterate backwards so Math.floor/random can multiply by the length
    for (var i = copy.length - 1; i > 0; i--) {
      // generate new index
      var newIndex = Math.floor(Math.random() * i + 1);
      // replace old value with new value
      var currentItem = copy[i];
      copy[i] = copy[newIndex];
      copy[newIndex] = currentItem;
    }
    return copy;
  };


/**
   * ADVANCED: EXTRA CREDIT BEGINS HERE
   * =================
   *
   * Note: This is the end of the required pre-course curriculum. Feel free to continue,
   * but everything beyond here is extra credit.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // use map to return new array with method calls
    // functionOrKey.apply(thisArg, argsArray)
    // argsArray is optional---------
    return _.map(collection, function(item) {
    // use map to iterate over every array item
      return typeof functionOrKey === 'function' ? functionOrKey.apply(item, collection) : item[functionOrKey].apply(item, collection);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // sort ascending = (a, b) => a - b
    return collection.sort(function(a, b) {
      return typeof iterator === 'string' ? a[iterator] - b[iterator] : iterator(a) - iterator(b);
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3])
  // returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    // METHOD 1
    // Push to main array within nested for loop
    // var args = Object.values(arguments);
    // var result = [];
    // var length = 0;
    // _.each(args, function(array, index) {
    //   if (array.length > length) {
    //     length = array.length;
    //   }
    //   _.each(array, function(item, idx) {
    //     if (!result[idx]) {
    //       result[idx] = [];
    //     }
    //     result[idx].push(item);
    //   });
    // });

    // _.each(result, function(newArray, idx) {
    //   var difference = length - newArray.length;
    //   if (difference > 0) {
    //     for (var i = 0; i < difference; i++) {
    //       result[idx].push(undefined);
    //     }
    //   }
    // });
    // return result;

    // REFACTOR
    var args = Object.values(arguments);
    var result = [];
    var length = _.reduce(args, function(acc, x) {
      return x.length > acc ? x.length : acc;
    }, 0);
    // iterate over length first instead then arguments array
    _.each(length, function(len, index) {
      var combined = [];
      _.each(args, function(array, idx) {
        combined.push(args[idx][index]);
      });
      result.push(combined);
    });
    return result;
  };
  // console.log(_.zip(['a', 'b', 'c', 'd'], [1, 2, 3]), 'test');


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var result = result || [];
    // recurse deep into array elements
    _.each(nestedArray, function(ele, idx) {
      // check if each array element is an array
      if (Array.isArray(ele)) {
        // if element is array, recurse
        _.flatten(ele, result);
      } else {
        // else push element
        result.push(ele);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var combined = _.flatten(Object.values(arguments));

    return _.filter(combined, function(ele, idx) {
      return _.indexOf(combined, ele) !== idx;
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var otherVals = _.flatten(Array.from(arguments).slice(1));
    // filter first array and iterate through arguments
    // can flatten array above or do nested for loop below on arguments array
    return _.filter(array, function(item, idx) {
      return otherVals.includes(item) ? false : true;
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.

// Creates and returns a new, throttled version of the passed function, that,
// when invoked repeatedly, will only actually call the original function at most
// once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

  _.throttle = function(func, wait) {
// TESTS
//     var isWaiting = false;
//     var callCount = 0;
//     var called = false;
//     return function() {
//       if (callCount > 0 && !called) {
//         func.apply(this, arguments);
//         called = true;
//         isWaiting = true;
//         callCount = 0;
//         setTimeout(function() {
//           isWaiting = false;
//           callCount = 0;
//           called = false;
//         }, wait);
//       }

//       if (!isWaiting && !called) {
//         func.apply(this, arguments);
//         isWaiting = true;
//         setTimeout(function() {
//           isWaiting = false;
//           callCount = 0;
//           called = false;
//         }, wait);
//       } else {
//         callCount ++;
//       }
//     };
// -----------------------------------
//     var waitTime;
//     var isWaiting = false;

//     return function() {
//       var runAfter = function() {
//         console.log('runs in interval');
//         return arguments ? func.apply(this, arguments) : clearInterval(waitTime);
//       };

//       if (!isWaiting) {
//         func.apply(this, arguments);
//         console.log('runs here');
//         isWaiting = true;
//         waitTime = setInterval(runAfter, wait);
//       }
//     };
// ------------------------------------
    var isWaiting = false;
    var counter = 0;

    var runAfter = function() {
      // if after wait, no call was run during isWaiting, we will stop function
      if (counter === 0) {
        isWaiting = false;
      } else {
        // if calls were made during wait, we will run once and reset;
        func.apply(this, arguments);
        console.log('runs here');
        counter = 0;
        setTimeout(runAfter, wait);
      }
    };

    return function() {
      // 1. run function once here
      if (!isWaiting) {
        func.apply(this, arguments);
        isWaiting = true;
        // 2. setTimeout
        setTimeout(runAfter, wait);
      } else {
        // if callback during wait, we will keep increment counter
        counter++;
      }
    };
  };
}());
