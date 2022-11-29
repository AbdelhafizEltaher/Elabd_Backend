const router = require('express').Router()
const { VerfiyAuthorization, VerfiyAdmin, VerfiyUser }= require('../Controlers/Auth')


router.post("/", VerfiyAdmin, async function (request, response, next) {

})

router.put("/:id", VerfiyAdmin, async function (request, response, next) {

})

router.get("/:id" ,async function (request, response, next) {

})
router.get("/", async function (request, response, next) {

})

router.delete("/:id", VerfiyAdmin, async function (request, response, next) {

})

router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

})
module.exports = router