const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
		return sum + item
	}
	const blogsLikes = blogs.map(blogs => blogs.likes)
    return blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blogs => blogs.likes)
    const mostLikesIndex = likes.indexOf(Math.max(...likes))
    const mostLikesBlog = blogs[mostLikesIndex]

    return {
        title: mostLikesBlog.title,
        author: mostLikesBlog.author,
        likes: mostLikesBlog.likes
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}