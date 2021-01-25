import express from 'express';
import Paint from '../models/paintModel.js';
import {isAuth, isAdmin} from '../utils.js'


const router = express.Router();
// get back list of paintings

router.get("/", async (req,res) =>{
    const paintings = await Paint.find({});
    res.send(paintings);
});

router.get("/:id", async (req,res) =>{
  const paint = await Paint.findOne({_id: req.params.id});
  if(paint){
    res.send(paint)
  }else{
    res.status(404).send({message: "Paint Not Found"})
  }
  res.send(paint);
});


router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const paintId = req.params.id;
  const paint = await Paint.findById(paintId);
  if(paint){
  
     paint.name = req.body.name;
     paint.price = req.body.price;
     paint.images = req.body.images;
     paint.category = req.body.category;
     paint.Qty = req.body.Qty;
     paint.description = req.body.description;
     const updatedPaint = await paint.save();
 if(updatedPaint){
    return res
    .status(200)
    .send({message: 'Paint Updated', data: updatedPaint});
 }
  }
  return res.status(500).send({ message: 'Error to updating Paint'});
})

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedPaint = await Paint.findById(req.params.id);
  if (deletedPaint) {
    await deletedPaint.remove();
    res.send({ message: 'Paint Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

// post the list of paintigs
 router.post("/", isAuth, isAdmin, async(req, res) => {
   const paint = new Paint ({
     name: req.body.name,
     price: req.body.price,
     image: req.body.image,
     category: req.body.category,
     Qty: req.body.Qty,
     description: req.body.description,
   });
   const newPaint = await paint.save();
   if(newPaint){
      return res.status(201).send({message: 'New Paint Created', data: newPaint});
   }
   return res.status(500).send({ message: 'Error to create Paint'});
 });


  
  export default router;