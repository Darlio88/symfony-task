import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { RootState } from '../app/store';
import {
    IPost,
    deletePost,
    deletePostById,
    updatePostById,
} from '../features/posts/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Post() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newUpdate, setNewUpdate] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);
    const activePost: IPost = useSelector((state:RootState) => state.posts.activePost);
    const { id } = useParams();

    // handle deletion
    function handleDelete(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) {
        e.preventDefault();
        //introduction this is the action to be dispatch but this is for demo purposes 
        // dispatch(deletePostById(parseInt(id)));

        //to delete post(N.B this should never be used in production, since deletion should be asynchronous )
        dispatch(deletePost(id))
        navigate('/');
    }
    //handle updating
    function handleUpdate(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
        e.preventDefault();
        setShowForm((prev) => !prev);
    }

    //handle submit
    function handleSubmit(e: React.FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        console.log(id, newUpdate);
        dispatch(updatePostById({ id, info: newUpdate }));
        navigate('/');
    }
    return (
        <div style={{ display: 'grid', margin: 'auto auto' }}>
            {/* back home button */}
            <Link to="/">
                <span
                    style={{
                        backgroundColor: 'whitesmoke',
                        padding: '4px',
                        borderRadius: '8px',
                        color: 'blue',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <small>Back home</small>
                </span>
            </Link>

            {/* post content */}
            <div>
                <p>{activePost.info}</p>
                <span style={{ display: 'flex', gap: '4px' }}>
                    {/* update button */}
                    <button
                        aria-label="update"
                        type="button"
                        onClick={(e) => handleUpdate(e)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    </button>
                    {/* delete button */}
                    <button
                        aria-label="delete"
                        type="button"
                        onClick={(e) => handleDelete(e, parseInt(id))}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </span>
            </div>

            {/* edit area */}
            {showForm ? (
                <form onSubmit={(e) => handleSubmit(e, parseInt(id))}>
                    <input
                        value={newUpdate}
                        onChange={(e) => setNewUpdate(e.target.value)}
                        placeholder="Enter new updated content"
                    />
                    <button type="submit">Update</button>
                </form>
            ) : null}
        </div>
    );
}

export default Post;
