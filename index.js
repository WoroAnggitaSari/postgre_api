const express = require('express');
const bodyParser = require('body-parser');
const pgsql = require('pg');
const app = express();

app.use(bodyParser.json());

//connection ke postgre
const {Client} = require ('pg');
const client = new Client({
			user: "postgres",
			password:"1234",
			host: "localhost",
			port: 5432,
			database: "nodejs_postgre"
});

client.connect((err)=>{
	if(err) throw err;
	console.log('Connected Successfully');
});

//show semua data
app.get('/api/siswa',(req, res) => {
	let sql = "SELECT id,nama_lengkap,to_char(tanggal_lahir,'yyyy-mm-dd') tanggal_lahir,alamat FROM siswa";
	let query = client.query(sql, (err, results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

//show by id
app.get('/api/siswa/:id',(req, res) => {
	let sql = "SELECT * FROM siswa WHERE id="+req.params.id;
	let query = client.query(sql, (err, results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows}));
	});
});

//nambah data
app.post('/api/siswa',(req, res) => {
	let sql = "INSERT INTO siswa (nama_lengkap,tanggal_lahir,alamat) VALUES ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"');";
	let query = client.query(sql, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"response": "Tambah data berhasil :"+sql}));
	});
});

//update
app.put('/api/siswa/:id', (req, res) => {
	let sql = "UPDATE siswa SET nama_lengkap = '"+req.body.nama_lengkap+"', tanggal_lahir = '"+req.body.tanggal_lahir+"', alamat = '"+req.body.alamat+"' where id = "+req.params.id;
	let query = client.query(sql,(err, results) => {
		if (err) throw err;
		res.send("response: Ubah data berhasil :"+sql);
	});
});

//delete
app.delete('/api/siswa/:id', (req, res) => {
	let sql = "DELETE FROM siswa where id="+req.params.id ;
	let query = client.query(sql,(err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"response": "Hapus data berhasil :"+sql}));
	});
});

app.listen(8000, ()=>{
	console.log('Server is running at port 8000');
});