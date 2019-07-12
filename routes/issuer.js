var express = require('express');
var router = express.Router();
var {verification_request, filterEvent} = require('../controller/logic');

router.get('/', async function(req, res, next) {
  await filterEvent('claim_requests', (data) => {
    // console.log("###########",data)
    res.render('inssurance_agency.pug', {requests : data});
  })
});

router.post('/verificationRequest', async function(req, res, next) {
  await verification_request(req.body.ID, req.body.fir, (data) => {
    // console.log("###########",data)
    res.send(`Police verification request has been raised for inssurance Id ${data}`);
  })  
});

module.exports = router;
