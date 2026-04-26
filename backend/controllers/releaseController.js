import Release from "../models/ReleaseModel.js";

 const getAllRelease = async (req,res)=>{
     try{
        const releases = await Release.find().sort({createdAt:-1})
        res.status(200).json({message:"succesfully get All release", data:releases})
     }catch(err){
        res.status(500).json({message:err.message})
     }
}

const createRelease = async(req,res)=>{
    try{
        const {name,date,additionalInfo} = req.body

        if(!name || !date){
            return res.status(400).json({message:"name and date are required"})
        }

        const release = await Release.create({
            name,
            date,
            additionalInfo,
        })
        res.status(201).json({ message: "Release created successfully", data: release })
    }catch(err){
       res.status(500).json({message:err.message})
    }
}


const getReleaseById = async(req,res)=>{
    try{
      const release = await Release.findById(req.params.id)
      if(!release) return res.status(404).json({message:"Release Not found"})
      res.status(200).json({message:"successfully find release", data:release})

    }catch(err){
        res.status(500).json({message:err.message})
    }

}


const updateRelease = async (req, res) => {
    const { steps, additionalInfo } = req.body
    try {
        const release = await Release.findById(req.params.id)
        if (!release) return res.status(404).json({ message: "Release Not found" })
         
        if (steps !== undefined) release.steps = steps;  
        if (additionalInfo !== undefined) release.additionalInfo = additionalInfo;

        const updsted = await release.save()
        res.status(200).json({message:"sucessfully update release",data:updsted});

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


 const deleteRelease = async (req, res) => {
    try {
        const release = await Release.findByIdAndDelete(req.params.id)
        if (!release)return  res.status(404).json({ message: "release not found" })

        res.status(200).json({ message: "sucessfully delete releas", data: release })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export {deleteRelease,updateRelease,getAllRelease,getReleaseById,createRelease}

