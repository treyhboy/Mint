//Response Writer can be extended for further version defining a simplified one as of now

module.exports.responseWriter = (res,status,responseObj) => {

    let token = null;
    try 
    {
        //Only if token value is present extraction must be attempted
        if(responseObj.hasOwnProperty('token'))
        {
            token = responseObj.token;
            return res.status(status).header("Authorization",`JWT ${token}`).json(responseObj);
        }
    }
    catch (err)
    {
        //If token exist but still we are unable to read then there must be a problem

        //TODO modify below statement using the npm debug package 
        //Beginner friendly

        console.log("Error occurred " + err.stack);

        return res.status(500).json({message : "Internal Error " + err.message});
    }


    //Setting the token value in the HTTP Response
    return res.status(status).json(responseObj);
}