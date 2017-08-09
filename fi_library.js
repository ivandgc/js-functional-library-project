fi = (function() {
  return {
    each: function(list, iteratee, context) {
      iteratee = iteratee.bind(context)
      if (Array.isArray(list)) {
        list.forEach( function callback(currentValue, index, array) {
          iteratee(currentValue, index , array)
        }
       )
      } else if (typeof list === 'object') {
         for (const key in list) {
           const value = list[key]
           iteratee(value, key, list)
         }
       }
     return list
    },
    map: function(list, iteratee, context) {
      iteratee = iteratee.bind(context)
      let newList = []
      if (Array.isArray(list)) {
        list.forEach( function callback(currentValue, index, array) {
          newList.push(iteratee(currentValue, index , array))
        }
       )
      } else if (typeof list === 'object') {
         for (const key in list) {
           const value = list[key]
           newList.push(iteratee(value, key, list))
         }
      }
      return newList
    },
    reduce: function(list, iteratee, memo, context) {
      iteratee = iteratee.bind(context)
      if (Array.isArray(list)) {
        if (memo === undefined){
            memo = list.shift()
        }
        list.forEach( function callback(currentValue, index, array) {
          memo = iteratee(memo, currentValue, index , array)
        }
       )
      } else if (typeof list === 'object') {
         for (const key in list) {
            const value = list[key]
            if (memo === undefined){
              memo = value
            } else {
              memo = iteratee(memo, value, key, list)
            }
         }
       }
     return memo
    },
    find: function(list, predicate, context) {
      predicate = predicate.bind(context)
      let result;
      if (Array.isArray(list)) {
        list.forEach( function callback(currentValue, index, array) {
          if (predicate(currentValue) && !result) {
            result = currentValue
          }
        }
       )
      } else if (typeof list === 'object') {
        for (const key in list) {
          const value = list[key]
          if (predicate(value) && !result) {
            result = value
          }
        }
      }
     return result
    },
    filter: function(list, predicate, context) {
      predicate = predicate.bind(context)
      let result = [];
      if (Array.isArray(list)) {
        list.forEach( function callback(currentValue, index, array) {
          if (predicate(currentValue)) {
            result.push(currentValue)
          }
        }
       )
      } else if (typeof list === 'object') {
        for (const key in list) {
          const value = list[key]
          if (predicate(value)) {
            result.push(value)
          }
        }
      }
     return result
    },
    sortBy: function(list, iteratee, context) {
      let newList = []
      if (typeof iteratee === 'function') {
        iteratee = iteratee.bind(context)
        list.forEach( function callback(currentValue, index, array) {
          newList.push(iteratee(currentValue, index , array))
        }
       )
      } else {
        list.forEach (function callback(element,index, array) {
          for (const key in element ) {
           const value = element[key]
           if (key === iteratee) {
            newList.push(value)
           }
         }
        }
        )
      }
       let flag;
       do {
        flag = false
        let dummy = 0
        newList.forEach( (element, i) => {
          if ((i + 1 < newList.length) && (element > newList[i + 1])){
            dummy = element
            newList[i] = newList[i + 1]
            newList[i + 1] = dummy
            dummy = list[i]
            list[i] = list[i + 1]
            list[i + 1] = dummy
            flag = true
          }
        }
        )
       } while (flag === true)
     return list
    },
    size: function(list) {
      if (Array.isArray(list)) {
          return list.length
      } else if (typeof list === 'object') {
         return Object.keys(list).length
       }
     return undefined
    },
    first: function(list, n) {
      n = n || 1
      if (Array.isArray(list)) {
          return list.slice(0, n)
      }
     return undefined
    },
    last: function(list, n) {
      n = n || 1
      if (Array.isArray(list)) {
          return list.slice( list.length - n, list.length)
      }
     return undefined
    },
    compact: function(list) {
      if (Array.isArray(list)) {
        newList = []
        list.forEach( element => {
          if(element) {
            newList.push(element)
          }
        })
        return newList
      }
     return undefined
    },
    uniq: function(list, isSorted, iteratee) {
      if (Array.isArray(list)) {
        let newList = []
        let transform = list
        if (typeof iteratee === 'function'){
          isSorted = false
          transform = fi.map(list, iteratee)
        }
        transform.forEach( element => {
          if(!isSorted && !newList.includes(element)) {
            newList.push(element)
          } else if (isSorted && newList[newList.length - 1] !== element ) {
            newList.push(element)
          }
        }
        )
        return newList
      }
     return undefined
    },
    keys: function(list) {
      if (typeof list === 'object') {
        let newList = []
        for (const key in list) {
          newList.push(key)
        }
        return newList
      }
     return undefined
    },
    values: function(list) {
      if (typeof list === 'object') {
        let newList = []
        for (const key in list) {
          newList.push(list[key])
        }
        return newList
      }
     return undefined
    },
    functions: function(object) {
      if (typeof object === 'object') {
        return Object.getOwnPropertyNames(object).sort()
      }
     return undefined
    },
    flatten: function(list, shallow) {
      let newList = []
      shallow = shallow || false
      if (Array.isArray(list)) {
        list.forEach( element => {
          if (!Array.isArray(element)) {
            newList.push(element)
          } else if (!shallow) {
            let dummy = fi.flatten(element)
            dummy.forEach (innerElement => newList.push(innerElement))
          } else {
            element.forEach (innerElement => newList.push(innerElement))
          }
        }
       )
      return newList
      }
    return undefined
    },
    bind: function(iteratee, object, ...args) {
      if (typeof object === 'object') {
        object.iteratee = iteratee
        return function() {
          return object.iteratee(...args)
        }
      }
      return undefined
    },
  }
})()
