const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = '5c5ea214c010b365031170c36dc3370c46fe44c18f086e73124dd4c0a7c7a550';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list 
  const name = body.user;
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);


  const isInTheList = verifyProof(proof,name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
