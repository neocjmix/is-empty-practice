import elasticsearch from 'elasticsearch-browser'

const client = new elasticsearch.Client({
    host: 'http://realestate-frank.dkos-lb.9rum.cc:10003',
    log: 'error'
});

export default ({index, query}) =>
    new Promise((resolve, reject) =>
        client.search({
            index: index,
            body: { query },
        }, (err, res) => err
            ? reject(err)
            : resolve(res.hits.hits.map(hit => hit._source))))
