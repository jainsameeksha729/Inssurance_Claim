var express = require('express');
var router = express.Router();
var {purchage, file_FIR, claim_request} = require('../controller/logic');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('customer.pug');
});
router.post('/buyInssurance', async function(req, res, next) {
 
  // return purchage(req.body.cname, req.body.iname, req.body.product, req.body.cost, req.body.idate, req.body.edate, req.body.premiumAmt, req.body.coverAmt).then((data)=>{
  //   return res.render('customer.pug',data);
  // });
  await purchage(req.body.cname, req.body.iname, req.body.product, req.body.cost, req.body.idate, req.body.edate, req.body.premiumAmt, req.body.coverAmt, (data) => {
    console.log("###########",data)
    res.send(`Your inssurance Id is ${data}`);
    // res.render('customer.pug',data);
  })
  
  // res.render('customer.pug', await purchage(req.body.cname, req.body.iname, req.body.product, req.body.cost, req.body.idate, req.body.edate, req.body.premiumAmt, req.body.coverAmt));
  // res.set('Content-Type', 'text/html');
  
});

router.post('/fileFIR', async function(req, res, next) {
  await file_FIR(req.body.inssuranceId, (data) => {
    console.log("###########",data)
    res.send(`Your FIR number is ${data}`);
  })  
});


router.post('/claimRequest', async function(req, res, next) {
  await claim_request(req.body.inssuranceID, req.body.firNumber, (data) => {
    console.log("###########",data)
    res.send(`Your inssurance claim has been raised and your claim request Id is ${data}`);
  })  
});

// router.get('/verification', function(req, res, next) {
//   res.render('inssurance_agency.pug');
// });

// router.post('verification/verificationRequest', async function(req, res, next) {
//   await verification_request(req.body.ID, req.body.fir, (data) => {
//     console.log("###########",data)
//     res.send(`Police verification request has been raised for this ${req.body.ID} inssurance Id ${data}`);
//   })  
// });


module.exports = router;
