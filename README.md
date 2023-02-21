This is the NoSQL database implemented on the file structure. This version of database only can use with NodeJS.

<br>

### Methods and how to use them:
<br>

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
db.select('database').table('table').get() - return all data from table
db.select('database').table('table').find({ any: '>=2000, <=3000' }).get() - show the rows where the number more or equal 2000 and less or equal 3000
db.select('database').table('table').find().get(20, 10) - get next 10 rows from 20 to 30
db.all() - get all row paths in all databases
```

<br>

### Examples:
<br>

1. Insert data to database
```
db.select('database').table('table').insert({ id: '1', name: 'test', price: '100', url: 'https' });
```
id must be a unique number.\
if you add data without id, id will be automatically added to the inserted data and begin from 1 and so on
<br><br>

2. Find data
```
db.select('database').table('table').find({ id: '1'}).get() ->
{
    data: [
        { id: '1', name: 'test', price: '100', url: 'https' }
    ],
    count: 0,
    max_items: 1
```
```
db.select('database').table('table').find({ name: 'test', price: '<500' }).get() ->
{
    data: [
        { id: '2', name: 'test', price: '499', url: 'https' },
        { id: '3', name: 'new test', price: '380', url: 'https' }
    ],
    count: 0,
    max_items: 2
}
```
3. Remove table
```
/database/table/rows
/database/table_2/rows
/database/table_3/rows

db.select('database').table('table').remove() ->

after:
/database/table_2/rows
/database/table_3/rows
```
4. Get data by 10 rows
```
db.select('database').table('table').find({ name: 'test', price: '<500' }).get(0, 10);
```
you will get first ten or less rows which respond filter
<br><br>

```
db.select('database').table('table').find({ name: 'test', price: '<500' }).get(10, 10);
```
you will get next ten rows and so on
<br><br>

5. Get all data
```
db.all() ->

[
  {
    database: 'database',
    table: 'table',
    row: '5465436',
    data: { id: '5465436', name: 'test' }
  },
  {
    database: 'database',
    table: 'table',
    row: '6754757',
    data: { id: '6754757', name: 'test' }
  },
  {
    database: 'database',
    table: 'table',
    row: '1325455',
    data: { id: '1325455', name: 'test' }
  }
]
```
