import {Router} from "express"
import Link  from "./Model/LinkModel.js"
const router = Router()

router.get("/:code",async(req,res)=>{
    try {
        const link = await Link.findOne({code:req.params.code})

        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json({message:"Ссылка не найдена"})
    } catch (error) {
        res.status(500).json({message: "Что-то пошло не так"})
    }
})

export default router