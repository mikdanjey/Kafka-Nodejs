const { Kafka, logLevel } = require('kafkajs');
const faker = require('faker');
const { CLOUDKARAFKA_TOPIC, CLOUDKARAFKA_BROKERS, CLOUDKARAFKA_USERNAME, CLOUDKARAFKA_PASSWORD, CLOUDKARAFKA_CLIENT_ID } = require("./config.js");

// 4oxw1lld-default
async function produce() {
    const kafka = new Kafka({
        clientId: CLOUDKARAFKA_CLIENT_ID,
        brokers: CLOUDKARAFKA_BROKERS,
        // connectionTimeout: 3000,
        // requestTimeout: 25000,
        // logLevel: logLevel.ERROR,
        // ssl: false,
        // ssl: true,
        // sasl: {
        //     mechanism: 'scram-sha-256', // plain, scram-sha-256 or scram-sha-512
        //     username: CLOUDKARAFKA_USERNAME,
        //     password: CLOUDKARAFKA_PASSWORD,
        // },
    });

    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected");

    const producedData = await producer.send({
        topic: CLOUDKARAFKA_TOPIC,
        messages: [
            {
                value: JSON.stringify({ name: faker.name.findName(), email: faker.internet.email(), phone: faker.phone.phoneNumber(), city: faker.address.city(), state: faker.address.state }),
                partition: 1
            },
        ],
    });
    console.log(`Produced data ${JSON.stringify(producedData)}`);
}

setInterval(() => {
    produce();
}, 3000);

