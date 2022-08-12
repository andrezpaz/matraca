function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer'})
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    console.log(req.body);
    const { requester, msg} = req.body
    
    if (requester && msg) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good'})
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}