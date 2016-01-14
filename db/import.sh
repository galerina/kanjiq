source ./db.cfg

mongoimport -h ds037205.mongolab.com:37205 -d japanese-items -c words -u $DB_USER -p $DB_PASSWORD --file ../app/data/jwords.json --jsonArray
