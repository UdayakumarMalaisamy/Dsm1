require('dotenv').config();
const mongoose = require('mongoose');

const checkIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('users');
    
    // Get all indexes
    const indexes = await collection.listIndexes().toArray();
    console.log('Indexes on users collection:');
    indexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    // Check if there are documents with id field
    const sampleDoc = await collection.findOne({});
    if (sampleDoc) {
      console.log('\nSample document structure:');
      console.log(Object.keys(sampleDoc));
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkIndexes();
