module.exports = function makeGetPostLocationPost({
    Post,
})
{
    return async function getPostLocation({ geolocation })
    {
        try{
            const posts = await Post.find({
                geoLocation: geolocation });
            if (!posts) {
                throw new ObjectNotFoundError('Post not found');
            }
            return posts;
        }
        catch(error){
            throw error;
        }
    }
}