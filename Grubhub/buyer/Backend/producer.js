var avroSchema = {
  name: "MyAwesomeType",
  type: "record",
  fields: [
    {
      name: "id",
      type: "string"
    },
    {
      name: "timestamp",
      type: "double"
    },
    {
      name: "message",
      type: "string"
    }
  ]
};

var avro = require("avsc");
var type = avro.parse(avroSchema);
var kafka = require("kafka-node");
var HighLevelProducer = kafka.HighLevelProducer;
var KeyedMessage = kafka.KeyedMessage;
var messageroutes = require("./routes/messageroutes.js");
console.log("print from source file here" + messageroutes.messages);

var client = new kafka.KafkaClient("localhost:2181", "my-client-id", {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
});

// For this demo we just log client errors to the console.
client.on("error", function(error) {
  console.error(error);
});

var producer = new HighLevelProducer(client);

producer.on("ready", function() {
  // Create message and encode to Avro buffer
  var messageBuffer = type.toBuffer({
    message: "hello JuL4",
    id: "3e0c63c4-956a-4378-8a6d-2de636d191dekkkii",
    timestamp: Date.now()
  });

  // Create a new payload
  var payload = [
    {
      topic: "node-test",
      messages: messageBuffer,
      attributes: 1 /* Use GZip compression for the payload */
    }
  ];

  //Send payload to Kafka and log result/error
  producer.send(payload, function(error, result) {
    console.info("Sent payload to Kafka: ", payload);
    if (error) {
      console.error(error);
    } else {
      var formattedResult = result[0];
      console.log("result: ", result);
    }
  });
});

// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
  console.error(error);
});
