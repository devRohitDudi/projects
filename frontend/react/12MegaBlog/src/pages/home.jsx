import React, { useState, useEffect } from 'react'
import dbService from '../appwrite/dbConfig'
import { Container, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        dbService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const authStatus = useSelector(state => state.auth.status)


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">

                        {authStatus ?
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts yet
                                </h1>
                                <button className='p-2 bg-amber-500 text-bold rounded-2xl hover:cursor-pointer' onClick={() => navigate('/add-post')}>Create post</button>
                            </div>
                            :
                            <h1>Login to explore blogs</h1>
                        }
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home