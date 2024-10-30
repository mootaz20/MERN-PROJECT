

exports.logout = async (req,res) =>{
    try{
        return res.status(200).json({message : "Logout successfully"})        
    }catch(err){
        return res.status(500).json({message : err.message})    
    }
}