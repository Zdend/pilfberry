#Useful commands

## DB Commands
- Produce dump
mongodump --db pilfberry_prod --archive > ./pilfberry_prod.20170603.dmp
or
mongodump --archive=pilfberry_prod.20150715.gz --gzip --db pilfberry_prod


- Copy dump to the local machine
scp pb:~/dumps/pilfberry_prod.20170603.dmp ./

mongorestore --db pilfberry_prod --archive=pilfberry_prod.20170603.dmp



