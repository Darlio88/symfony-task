import React, {useState } from 'react';
import type { RootState } from '../app/store';

import { useSelector, useDispatch } from 'react-redux';
import { IPost, createPost, fetchPostById } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState('');
    const posts: IPost[] = useSelector((state:RootState) => state.posts.posts);

    function handleClick(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        e.preventDefault();
        console.log(id);
        dispatch(fetchPostById(parseInt(id)));
        navigate(`/posts/${id}`);
    }

    function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(
            createPost({
                id: posts.length + 1,
                info: newPost,
            })
        );
        setNewPost('');
    }

    return (
        <main>
            {/* posts */}
            <div style={{ display: 'grid', gap: '8px' }}>
                {/* create post form */}
                <form onSubmit={handleCreate}>
                    <input
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Create a post..."
                    />
                    <button type="submit">Create</button>
                </form>

                {/* single post */}
                {posts.map((post: IPost, id) => (
                    <button key={id} onClick={(e) => handleClick(e, post.id)}>
                        <span style={{ marginRight: '8px' }}>{post.id}</span>
                        <p>{post.info}</p>
                    </button>
                ))}
            </div>
            {/* create post button */}
        </main>
    );
}
