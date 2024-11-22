"use client";

import { useState, useEffect } from "react";

export default function FetchPostsPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("An Unexpected Error"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-6 inline-block border-b-2 border-gray-400 pb-1">
                Posts
            </h1>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map((post: { id: number; title: string; body: string }) => (
                        <div
                            key={post.id}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow"
                        >
                            <h3 className="text-lg font-semibold text-black mb-2 text-left">
                                {post.title}
                            </h3>

                            <p className="text-gray-700 text-left">{post.body}</p>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <p className="text-gray-500 text-lg">No posts available</p>
                    )
                )}
            </div>
        </div>
    );
}
