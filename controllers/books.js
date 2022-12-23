const router = require('express').Router()
const Book = require('../models/books')

router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})


router.get('/', async (req, res) => {
    const book = await Book.find()
        .catch(err => {
            res.status(400).send(err, 'err')
        })
    res.json(book)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)
        .catch(err => {
            res.status(400).send(err, 'err')
        })
    res.json(book)
})

router.post('/', async (req, res) => {
    const book = await new Book(req.body).save()
        .catch(err => {
            res.status(400).send(err, 'err')
        })
    res.json(book)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    await Book.findByIdAndUpdate(id, req.body)
    res.json(id)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params    
    await Book.findByIdAndDelete(id)
    res.status(303).send('delete successful')
})


module.exports = router