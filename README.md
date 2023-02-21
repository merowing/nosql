Methods and how to use them:

```
db.remove() - remove all databases
db.select('database').remove() - remove database
db.select('database').table('table').remove() - remove table
db.select('database').table('table').remove('id') - remove row by id
db.select('database').table('table').clean() - clean table
```
```
db.select('database') - create or select database
db.select('database').table('table') - create or select table
db.select('database').table('table').insert({}) - insert data to row
```
```
db.select('database').table('table').find({}) - find rows by values
db.select('database').table('table').find({ any: '>=2000, <=3000' }) - show the rows where the number more or equal 2000 and less or equal 3000
db.all() - get all row paths in all databases
```
