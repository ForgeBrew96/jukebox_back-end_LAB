const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

//write your controller functions here
// READ - POST = /pets
router.post('/', async (req, res) => {
try {
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
} catch (error) {
    res.status(500).json({ error: error.message})
}
});

// READ - GET = /pets
router.get('/', async (req, res) => {
    try {
        const foundTracks = await Track.find(req.body)
        res.status(200).json(foundTracks)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
});

 // READ - SHOW = /pets

 router.get('/:trackId', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.trackId)

        if (!foundTrack) {
            res.status(404);
            throw new Error('Track not found')
        }

        res.status(200).json(foundTrack)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
 })

//DELETE -- PET
router.delete('/:trackId', async (req, res) => {
    try {
        const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)
        
        if (!deleteTrack) {
            res.status(404);
            throw new Error('Track not found.')
        } 
        
            res.status(200).json(`Track deleted`)
            } catch (error) {
                if (res.statusCode === 404) {
                    res.json({ error: error.message})
                } else {
                    res.status(500).json({ error: error.message });
                }
            }
});

 //UPDATE--PUT--PET
router.put('/:trackId', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, { new: true })
        
        if (!updatedTrack) {
            res.status(404);
            throw new Error('Track not found')
        }
        
        res.status(200).json(updatedTrack);
            } catch (error){
               if (res.statusCode === 404) {
                res.json({error: error.message})
               } else {
                res.status(500).json({ error: error.message })
               }
            }
});

// exports the router at the bottom of the file
module.exports = router;