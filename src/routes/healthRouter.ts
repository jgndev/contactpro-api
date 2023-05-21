import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("What?");
    res.status(200).json({message: "Ok"});
});

export default router;

