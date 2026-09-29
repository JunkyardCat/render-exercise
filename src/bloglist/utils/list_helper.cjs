const dummy = (blogs) =>{
  return 1
}

const totalLikes = (blogs) =>{
  const total = blogs.reduce((a,b)=>{
    return a+b.likes
  },0)
  
  console.log('total',total)
  return total
}

const favoriteBlog = (blogs) =>{
  const highest = blogs.reduce((a,b)=>{
    return b.likes>a.likes?b:a
  }
  )
  
  console.log(highest)
  return highest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
