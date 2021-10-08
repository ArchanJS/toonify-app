const router=require('express').Router();
const {toonifyImage}=require('../controllers/toonifyCon');

router.post('/toonifyimage',toonifyImage);

module.exports=router;