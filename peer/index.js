'use strict'

const ipfsClient = require('ipfs-http-client')

const topic = 'babooshka'

const main = (async () => {

    //const ipfs = ipfsClient('/ip4/0.0.0.0/tcp/5001')
    const ipfs = ipfsClient('/dns4/ipfs/tcp/5001')

    try {
        await ipfs.pubsub.subscribe(topic, ({ from, data }) => {
            console.log({
                from,
                data: data
            })
        })
    } catch (error) {
        console.error(error)
    }

    process.openStdin().addListener("data", (data) => {
        ipfs.pubsub.publish(topic, Buffer.from(data))
    });

})()
