const { Router } = require('express')
const router = Router();
const { Country, Activity } = require('../db.js');
const { getDbInfo } = require('../controller/getApiInfo')
// Pedimos los datos por get ,
router.get('/', async (req, res) => {
    const {name} = req.query
    let countriesTotal = await getDbInfo();
    if (name) {
        let countryName = await countriesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('No esta el Pais');
    } else {
        res.status(200).send(countriesTotal);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    let countriesTotal = await getDbInfo();
    if (id) {
        let countryId = await countriesTotal.filter(el => el.id == id.toUpperCase())
        countryId.length ?
            res.status(200).send(countryId) :
            res.status(404).send('No esta el Pais');
    }
})



module.exports = router;

     
// router.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const { name, difficulty, duration, season, countryId } = req.body
//     const updateActivity = await Activity.update({
//         name,
//         difficulty,
//         duration,
//         season,
//         countryId,
//     }, {
//         where: {
//             id,
//         }
//     })
//     const countries = await Country.findAll({
//         where: {
//             id: countryId,
//         }
//     })
//     updateActivity.addCountries(countries)
//     res.status(200).send(updateActivity)
// }
// )
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteActivity = await Activity.destroy({
//         where: {
//             id,
//         }
//     })
//     res.status(200).send(deleteActivity)
// }
// )
// module.exports = router;

