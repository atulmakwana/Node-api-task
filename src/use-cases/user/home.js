module.exports = function makeUserHome({
    User,
    Post,
})
{
    return async function userHome()
    {
        try{
            const countActive = await Post.aggregate([
                {
                    $group: {
                        _id: '$active',
                        count: { $sum: 1 }
                    }
                }
            ]);
            return countActive
        }
        catch(error){
            throw error;
        }
    }
}