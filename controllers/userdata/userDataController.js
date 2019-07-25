module.exports = async (req, res) => {

    try {

        res.status(200).json({
            message : "Sucess",
            log: "User data.",
            data : req.userData.data
        })

    } catch (err) {

        console.log(err);
        res.status(500).json({
            message : err
        })
    }
}