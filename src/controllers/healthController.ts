/*
 * Copyright (c) 2023, Jeremy Novak
 */
import app from "../app";

app.get('/health', async (req, res) => {
    console.log("What?");
    res.status(200).json({message: "Ok"});
});

