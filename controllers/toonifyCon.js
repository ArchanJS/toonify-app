const deepai = require('deepai');

deepai.setApiKey(process.env.API_KEY);

exports.toonifyImage=async(req,res)=>{
    try {
        const {userImg}=req.body;
        var resp = await deepai.callStandardApi("toonify", {
            image: userImg
        });
        res.status(200).send(resp);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong!"});
    }
}