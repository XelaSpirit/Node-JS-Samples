//Author: Alex Morse
//Date created: 6 / 21 / 2020
//Description: A small program to test the mongodb package and show some of it's simple functionality that will be needed for my Large Project in COP4331C.
//             There's plenty of comments explaining every bit of code so this should make using the mongodb package very easy to understand.
//This was created using mongodb's tutorial and some light googling - https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/
//Note that this doesn't contain everything from that tutorial, just some basic sample code I created to help me understand it.
//For testing I used this code, uncommented the lines I was testing, and had mongodb open in my browser so I could quickly refresh and see the changes in the database.

//Include mongodb client from mongodb package.
//Make sure to run 'npm install mongodb' in the directory this project is in for this to work.
const MongoClient = require("mongodb").MongoClient;
//Include assert for error checking. I use assert.equal() to make sure there's no errors. If an error exists - the program will automatically termincate and the error will show up in the console.
const assert = require("assert");

//Login credentials
//Replace *** with the proper information (username/password, cluster, database (db), and collection (col)).
const username = "***"
const password = "***"
const cluster = "***", db = "***", col = "***"

//Connection URL
const uri = "mongodb+srv://" + username + ":" + password + "@" + cluster + "-u1eml.mongodb.net/<dbname>?retryWrites=true&w=majority";

//Create a new MongoClient.
//useNewURLParser was included in the mongodb tutorial on their website - pretty sure it has to do with the URL encoding mongodb was telling me about when I created a database.
//useUnifiedTopology was added after the mongodb node.js package gave me warnings about using deprecated functionality and telling me that adding useUnifiedTopology would use the new functionality.
//Remember the client still needs to be connected after this. See line 51.
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Note that sample data is what I have been using during my tests, meaning there's a chance this data already exists in the database.
//In future tests, this data should be changed in order to make database changes more obvious - making it easier to know when things work.

//Sample data for insert
const one = {"Message":"Goodbye", "Number":10, "Value":true}
const many = [{"Message":"One", "Number":1, "Data":"A"}, {"Message":"Two", "Number":2, "Data":"A"}, {"Message":"Three", "Number":3, "Data":"A"}]

//Sample data for update
const oneFrom = {"Number":10}
const oneTo = {"Message":"Howdy", "Number":10, "Value":true}
const manyFrom = {"Value":true}
const manyTo = {"Value":false}

//Sample data for delete
const oneRemove = {"Number":10}
const manyRemove = {"Value":false}

//Sample data for find
const findSample = {"Data":"A"}

//Connects the client to the database.
client.connect(main);

//Return function for insert
//See insert examples on lines 184-188
function insertComplete(err, r) {
	//Assert for error checking - see line 12
	assert.equal(null, err);
	//r is a structure containing some data about the insertion operation - search for the insertOne() or insertMany() documentation on mongodb's website.
	//r.insertedCount gives you the number of documents inserted.
    console.log(r.insertedCount);

	//Client.close() is here because during my tests I always knew for a fact once this function was called I was done.
	//In larger programs, client.close should be called only when you're positive no more mongodb functions will be called - which probably won't be here.
	client.close();
}

//Return function for update
//See update examples on lines 190-194
function updateComplete(err, r) {
	//Assert for error checking - see line 12
	assert.equal(null, err);

	//r is a structure containing some data about the update operation - search for the updateOne() or updateMany() documentation on mongodb's website.
	//r.matchedCount gives the number of documents in the database that matched the filter used.
	//r.modifiedCount gives the number of documents in the database that were actually modified.
	//It may seem weird for this to be 2 different values, but these may actually be different.
	//Most notably in the case of updateOne(), there could easily be multiple documents matching the filter despite only one being updated.
	//Although based on the documentation I've read it would seem this could happen with updateMany() too depending on your settings.
	//Unless you explicitly change the settings and intentionally cause this, however, I don't think it'll be an issue.
	console.log(r.matchedCount);
	console.log(r.modifiedCount);

	//Client.close() is here for testing purposes and convenience. See line 62
	client.close();
}

//Return function for delete
//See remove examples on lines 196-200
function deleteComplete(err, r) {
	//Assert for error checking - see line 12
	assert.equal(null, err);
	//r is a structure containing some data about the delete operation - search for the deleteOne() or deleteMany() documentation on mongodb's website.
	//r.deletedCount gives the number of documents deleted from the database.
	console.log(r.deletedCount);

	//Client.close() is here for testing purposes and convenience. See line 62
	client.close();
}

//Return function for find().toArray()
//See find examples on lines 202-208
function findCompleteArray(err, docs) {
	//Assert for error checking - see line 12.
	assert.equal(null, err);
	//Docs is an array containing all of the documents that matched the search.
	console.log(docs.length);
	console.log();
	for (i = 0; i < docs.length; i++) {
		console.log("Doc " + i + ":");
		//Prints the full doc object
		console.log(docs[i]);
		//Prints just one component of the doc object. Accessed like a JSON object, whatever you put as the keys in the JSON you added to the database is used here.
		console.log("Message: " + docs[i].Message);
		console.log();
	}

	//Close.close() is here for testing purposes and convenience. See line 62
	client.close();
}

//Return function for find().forEach()
//See find examples on lines 202-208
function findCompleteEach(err, doc) {
	//Assert for error checking - see line 12.
	assert.equal(null, err);

	if (doc == null) {
		//Close.close() is here for testing purposes and convenience. See line 62
		client.close();

		//When using the find().each() method, returning false causes the processing of documents to end early.
		//For example, if 100 documents are returned, and on document 5 you return false, documents 6-100 will never be processed.
		return false;
	}

	//Print the entire doc object.
	console.log(doc);
	//Prints just one component of the doc object. Accessed like a JSON object, whatever you put as the keys in the JSON you added to the database is used here.
	console.log("Message: " + doc.Message);
}

//Returns function for find().next()
//See find examples on lines 202-208
var nextCursor;
function findCompleteNext(err, doc) {
	//Assert for error checking - see line 12.
	assert.equal(null, err);

	//If doc is null, the cursor was closed and there are no more results to iterate through
	if (doc == null) {
		//Always close the cursor when you're done with it.
		cursor.close();

		//Close.close() is here for testing purposes and convenience. See line 62
		client.close();
		return;
	}

	//Print the entire doc object.
	console.log(doc);
	//Prints just one component of the doc object. Accessed like a JSON object, whatever you put as the keys in the JSON you added to the database is used here.
	console.log("Message: " + doc.Message);

	//Process the next document.
	nextCursor.next(findCompleteNext);
}

//This function is called when the client either establishes a connection or fails to do so from client.connect() on line 51
function main(err) {
	//Assert for error checking - see line 12
	assert.equal(null, err);
	console.log("Connected");

	//Collection to perform operations on.
	//On mongodb's website, select your cluster and go to collections. The collection you're using should have <database>.<collection> in big bold letters at the top - that's what goes here.
	const collection = client.db(db).collection(col);

	//Note that some mongodb functions (such as insert) are asynchronous. The insertComplete function, for example,
	//is called when the insert is completed, which may be after the function main has finished.
	//This means you shouldn't call client.close in main without ensuring all other functions have completed.
	//This is why client.close() is currently in insertComplete(). For testing purposes, I know that my use of client is done when insertComplete is called.
	//In a larger program, code must be written in a way to ensure client.close() is not called until *all* mongodb operations are completed.

	//Insert examples - uncomment to run.
	//Remember insertComplete currently has client.close() at the end of it - that's because I only ran one of these at a time.
	//Uncommenting both of these at once without changing insertComplete will cause errors and a crash.
		collection.insertOne(one, insertComplete);		//Inserts a single document into the database.
		//collection.insertMany(many, insertComplete);		//Inserts multiple documents into the database.

	//Update exmples - uncomment to run.
	//Remember updateComplete() currently has client.close() at the end of it - that's because I only ran one example at a time.
	//Uncommenting all the examples at once without changing updateComplete() will cause errors and a crash.
		//collection.updateOne(oneFrom, {$set: oneTo}, updateComplete);			//Updates only one document matching the filter from the database.
		//collection.updateMany(manyFrom, {$set: manyTo}, updateComplete);		//Updates every document matching the filter from the database.

	//Delete examples - uncomment to run.
	//Remember deleteComplete() currently has client.close() at the end of it - that's because I only ran one example at a time.
	//Uncommenting all the examples at once without changing deleteComplete() will cause errors and a crash.
		//collection.deleteOne(oneRemove, deleteComplete);		//Deletes only one document matching filter from the database.
		//collection.deleteMany(manyRemove, deleteComplete);	//Deletes every document matching the filter from the database,

	//Find examples - uncomment to run.
	//Remember searchComplete() currently has client.close() at the end of it - that's because I only ran one example at a time.
	//Uncommenting all the examples at once without changing searchComplete() will cause errors and a crash.
		//collection.find(findSample).limit(2).toArray(findCompleteArray)	//Finds first 2 results matching findSample and turns them into an array for processing.
		//collection.find(findSample).limit(2).each(findCompleteEach);		//Finds first 2 results matching findSample and runs a function for every document returned.
		//nextCursor = collection.find(findSample).limit(2);				//Creates a cursor pointing to the results of the search for the first 2 elements matching findSample.
		//nextCursor.next(findCompleteNext);								//According to the mongoDB tutorial, this is the recommended way to use find() and is more efficient than toArray()/forEach()
}
