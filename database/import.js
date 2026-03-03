const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const BSON = require('bson');
const EJSON = BSON.EJSON;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'ecommerce';
const exportPath = path.join(__dirname, 'exported_data');

async function importCollections() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to server for import');
    const db = client.db(dbName);

    const files = fs.readdirSync(exportPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const collectionName = file.replace('.json', '');
      const filePath = path.join(exportPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      const data = EJSON ? EJSON.parse(fileContent) : JSON.parse(fileContent);
      
      if (data && data.length > 0) {
          const collection = db.collection(collectionName);
          // Drop collection if it exists to replace
          try {
              await collection.drop();
          } catch(e) { /* ignore if collection doesn't exist */ }
          
          await collection.insertMany(data);
          console.log(`Imported ${data.length} records into ${collectionName}`);
      } else {
          console.log(`No data to import for ${collectionName}`);
      }
    }
    console.log('Database import complete!');
  } catch (err) {
    console.error('Import failed:', err);
  } finally {
    await client.close();
  }
}

importCollections();
