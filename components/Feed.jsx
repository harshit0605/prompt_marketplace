'use client'

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
//  let filteredPosts = []

  const handleSearchChange = (e) => {
    // setSearchText(e.target.value)
    setSearchText(e.target.value)
    // const subPosts = posts.filter((post) => post.prompt.contains(searchText))
    // setFilteredPosts(subPosts)
    setFilteredPosts(posts.filter((post) => post.prompt.includes(searchText) || post.tag.includes(searchText) || post.creator.username.includes(searchText)  ))
    // filteredPosts = posts.filter((post) => post.prompt.includes(e.target.value))
  }

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json()
        setPosts(data)
        
        setFilteredPosts(data)
    }
    
    fetchPosts()
  },[])

  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input 
            type='text'
            placeholder='Search for a tag or a username'
            value={searchText}
            
            onChange={handleSearchChange}
            required
            className='search_input peer '
            />
        </form>

        <PromptCardList
        data={filteredPosts}
        handleTagClick={(tag) => {
            setSearchText(tag)
            setFilteredPosts(posts.filter((post) => post.tag===tag))
        }}
        />

    </section>
  )
}

export default Feed