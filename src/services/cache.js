const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient('redis://127.0.0.1:6379');
const util = require('util');
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.hashKey = JSON.stringify(options.key || '');
    this.cacheStatus = true;
    return this;
}


mongoose.Query.prototype.exec = async function() {

    if(!this.cacheStatus) {
        console.log('by mongodb')
        return exec.apply(this , arguments);
    }

    const key = JSON.stringify(Object.assign({} , this.getQuery() , {
        collections : this.mongooseCollection.name
    }));

    const cachedValue = await client.hget(this.hashKey , key);

    if (cachedValue) {
        const doc = JSON.parse(cachedValue);
        console.log('by cache')
        return Array.isArray(doc)
                    ? doc.map(d => new this.model(d))
                    : new this.model(doc)
    }


    const result = await exec.apply(this , arguments);
    client.hset(this.hashKey , key , JSON.stringify(result));
    return result;

}


module.exports = {
    clearHash : function(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}