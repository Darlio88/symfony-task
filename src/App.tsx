import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Home from './Pages/Home';
import Post from './Pages/Post';
import { fetchPosts } from './features/posts/postSlice';

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                {/* home page */}
                <Route path="/" element={<Home />} />
                <Route path="/posts/:id" element={<Post />} />
            </Routes>
        </BrowserRouter>
    );
}
