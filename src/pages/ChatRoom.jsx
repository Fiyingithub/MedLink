import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/Axios';
import { io } from 'socket.io-client';
import { useUser } from '../context/UserContext';

const socket = io('http://localhost:5000');

const ChatRoom = () => {
  const { recipientId } = useParams();
  const { currentUser } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    socket.emit('join', { userId: currentUser._id });

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/chat/${currentUser._id}/${recipientId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    if (currentUser) fetchHistory();
  }, [recipientId, currentUser]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msgObj = {
      sender: currentUser._id,
      receiver: recipientId,
      content: newMsg,
    };

    socket.emit('private_message', msgObj);
    setMessages((prev) => [...prev, { ...msgObj, timestamp: new Date() }]);
    setNewMsg('');
  };

  if (!currentUser) return <p className="text-center">Loading user...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>
      <div className="border h-96 overflow-y-scroll p-4 bg-gray-50 rounded shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.sender === currentUser._id ? 'text-right' : 'text-left'}`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.sender === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.content}
            </p>
            <div className="text-xs text-gray-400">
              {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
