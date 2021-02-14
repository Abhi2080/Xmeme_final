// Route to handle all the bad requests made to the server;

exports.errorRoute = async function( req, res ,next ){
    res.status(400);
    res.end();
    return;
}