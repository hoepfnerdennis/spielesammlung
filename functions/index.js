// The Firebase Admin SDK to access the Firebase Realtime Database.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require('firebase-admin');
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require('firebase-functions');

firebase.initializeApp(functions.config().firebase);

const db = firebase.firestore();

exports.addBookmarks = functions.https.onRequest(async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
    return;
  }
  const { name, bookmarks } = req.body;
  if (!name || name.length === 0 || typeof name !== 'string') {
    res.sendStatus(500);
    return;
  }
  if (!Array.isArray(bookmarks)) {
    res.sendStatus(500);
    return;
  }
  if (bookmarks.some((bookmark) => typeof bookmark !== 'string')) {
    res.sendStatus(500);
    return;
  }
  try {
    const docRef = db.collection('bookmarks').doc(name);
    await docRef.set({ name, bookmarks });
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
});

exports.getBookmarks = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection('bookmarks').get();
    const entries = [];
    snapshot.forEach((doc) => {
      const entry = doc.data();
      entries.push(entry);
    });
    res.setHeader('content-type', 'application/json');
    res.send(entries);
  } catch (error) {
    res.sendStatus(500);
  }
});
