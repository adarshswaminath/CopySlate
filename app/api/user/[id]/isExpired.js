export const isExpired = (post) => {
    let expiredDate = post.expireDate
    let currentTime = new Date()
    if(currentTime < expiredDate){
        return true // time not expired
    } else {
        return false // time is expired
    }
}