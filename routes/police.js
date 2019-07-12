var express = require('express');
var router = express.Router();
var {policeVerification, filterEvent} = require('../controller/logic');

router.get('/', async function(req, res, next) {
  await filterEvent('verification_requests', (data) => {
    // console.log("###########",data)
    res.render('police_agency.pug', {requests : data});
  })
});

router.post('/policeVerification', async function(req, res, next) {
  await policeVerification(req.body.ID, req.body.fir, (data) => {
    // console.log("###########",data)
    res.send(`User is verified for the claim`);
  })  
});

module.exports = router;
