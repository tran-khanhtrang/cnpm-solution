const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const BSON = require('bson');

const EJSON = BSON.EJSON;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'ecommerce';
const exportPath = path.join(__dirname, '..', 'database', 'exported_data');
const databasePath = path.join(__dirname, '..', 'database');

async function exportCollections() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to server');
        const db = client.db(dbName);
        const collections = await db.collections();

        if (!fs.existsSync(exportPath)) {
            fs.mkdirSync(exportPath, { recursive: true });
        }

        const collectionNames = [];

        for (const collection of collections) {
            const collectionName = collection.collectionName;
            collectionNames.push(collectionName);
            const data = await collection.find({}).toArray();
            const filePath = path.join(exportPath, `${collectionName}.json`);

            // Use EJSON to preserve ObjectIds and Dates
            const ejsonData = EJSON ? EJSON.stringify(data, null, 2) : JSON.stringify(data, null, 2);

            fs.writeFileSync(filePath, ejsonData);
            console.log(`Exported ${data.length} records from ${collectionName} to ${filePath}`);
        }

        // Now write an import script
        const importScript = `const { MongoClient } = require('mongodb');
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
          console.log(\`Imported \${data.length} records into \${collectionName}\`);
      } else {
          console.log(\`No data to import for \${collectionName}\`);
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
`;
        // Save the import script in the database folder next to the exported data
        fs.writeFileSync(path.join(databasePath, 'import.js'), importScript);
        console.log('Generated import.js to restore database easily!');

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

exportCollections();
