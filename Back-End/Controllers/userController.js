

exports.getUser = async (req,res) =>{
    try{
        return res.status(200).json({
            status : "success",
            data : req.user
        })
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}