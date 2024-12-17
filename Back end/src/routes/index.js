
const bakeGoodRouter = require('./bakeGoodRouter');


const routes = (app) =>{
    app.use('/api/bakeGood', bakeGoodRouter);
}

module.exports = routes