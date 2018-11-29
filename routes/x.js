
// related objs

// using references (normalization) => CONSISTENCY 
let author = {
    name: 'John'
}

let course = {
    author: 'id',
} 
// because we are using nosql, relationships does not matter


// using embedded documents (denormalization) => PERFORMANCE
let  course = {
    author: {
        name: 'John'
    }
}

// hybrid approach
let author = {
    name: 'John'
    // 50 other props
}

let course = {
    author: {
        id: 'ref',
        name: 'John'
    }
} // good for having a snapshot of the data in a point of time 


// trades off between query performance vs consistency 

// all approaches relies on the app's needs 

