const add_worker = (req, res, next) => {
    res.status(200).json({
        message: 'Workers were fetch.'
    });
};

module.exports = {
    add_worker,
}