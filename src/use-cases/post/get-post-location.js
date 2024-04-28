module.exports = function makeGetPostLocationPost({
    Post,
    User,
})
{
    return async function getPostLocation({ geolocation,username })
    {
        try{
            const user = await User.findOne({ username });

            const posts = await Post.find({
                geoLocation: geolocation ,
                createdBy: user._id
            });
            return posts;
        }
        catch(error){
            throw error;
        }
    }
}