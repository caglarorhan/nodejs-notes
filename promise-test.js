const p1 = new Promise(resolve => {
    setTimeout(() => {
//console.log('Original api request which take time!!!');
        resolve(1)
    }, 5000)
})


const p2 = new Promise(resolve => {
    setTimeout(() => {
//console.log('Control time amount!');
        resolve(2)
    }, 1000)
})

Promise.race([p1, p2])
    .then(res => console.log(res))
//.catch(err=> console.log(err));
