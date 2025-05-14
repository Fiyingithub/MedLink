import React, { useState } from 'react';
import API from '../api/axios'; // Adjust path if needed

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            setLoading(true);
            const response = await API.post('/forgot-password', { email });
            setMessage(response.data.message || 'Reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.error || 'Error sending reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p className="text-green-600 text-center mt-4">{message}</p>}
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
