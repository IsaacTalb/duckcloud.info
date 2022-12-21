function myFunction() {
  document.getElementById("demo").innerHTML = "yeah, it's worked";
}

var conn = MongoClient.connect('mongodb://https://github.com/IsaacTalb/duckcloud.info/') // returns a Promise

app.get('/', function(req, res) {
    conn.then(client=> client.db('test').collection('test').find({}).toArray(function(err, docs) {
        if(err) { console.error(err) }
        res.send(JSON.stringify(docs))
    }))
})
