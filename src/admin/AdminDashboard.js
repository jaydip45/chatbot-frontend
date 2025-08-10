import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import {
  Box, Typography, List, ListItem, ListItemText, TextField, Button
} from '@mui/material';

import {
  fetchConversationsRequest,
  fetchMessagesRequest,
  fetchUserInfoRequest,
  sendMessageRequest,
} from '../redux/admin/adminActions';

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    conversations,
    messages,
    userInfo,
    loadingConversations,
    loadingMessages,
    loadingUserInfo,
    sendingMessage,
  } = useSelector(state => state.admin);

  const [selectedConv, setSelectedConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const adminUserId = '6898608ca73a917d49894858';

  useEffect(() => {
    dispatch(fetchConversationsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedConv?._id) return;

    socket.connect();
    socket.emit("joinConversation", selectedConv._id);

    socket.on("receiveMessage", (message) => {
      dispatch({
        type: "FETCH_MESSAGES_SUCCESS",
        payload: [
          ...messages.filter(m => m._id !== message._id),
          message
        ]
      });
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [selectedConv?._id, messages, dispatch]);


  const loadConversation = (conv) => {
    setSelectedConv(conv);
    dispatch(fetchMessagesRequest(conv._id));

    const userId = conv.members.find(id => id !== adminUserId);
    if (userId) {
      dispatch(fetchUserInfoRequest(userId));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;

    const userId = selectedConv.members.find(id => id !== adminUserId);

    dispatch(sendMessageRequest({
      conversationId: selectedConv._id,
      senderId: adminUserId,
      receiverId: userId,
      text: newMessage,
      senderType: "admin"
    }));

    socket.emit("sendMessage", {
      conversationId: selectedConv._id,
      senderId: adminUserId,
      receiverId: userId,
      text: newMessage,
      senderType: "admin"
    });

    setNewMessage('');
  };

  const uniqueMessages = messages.filter((msg, idx, arr) =>
    arr.findIndex(m => m._id === msg._id) === idx
  );

  return (
    <Box display="flex" height="100vh">
      <Box width="300px" borderRight="1px solid #ccc" overflow="auto" p={2}>
        <Typography variant="h6" mb={2}>Conversations</Typography>
        {loadingConversations && <Typography>Loading...</Typography>}
        <List>
          {conversations.map(conv => (
            <ListItem
              button
              key={conv._id}
              selected={selectedConv?._id === conv._id}
              onClick={() => loadConversation(conv)}
            >
              <ListItemText
                primary={conv.sessionId}
                secondary={new Date(conv.updatedAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box flex={1} p={2} display="flex" flexDirection="column" height="100vh">
        {selectedConv ? (
          <>
            {loadingUserInfo && <Typography>Loading user info...</Typography>}
            {userInfo && (
              <Box mb={2} p={2} border="1px solid #ccc" borderRadius={1} bgcolor="#f9f9f9">
                <Typography variant="subtitle1" mb={1} fontWeight="bold">User Details</Typography>
                <Typography><strong>Email:</strong> {userInfo.email || 'N/A'}</Typography>
                <Typography><strong>IP Address:</strong> {userInfo.ipAddress || 'N/A'}</Typography>
                <Typography><strong>Device Info:</strong> {userInfo.deviceInfo || 'N/A'}</Typography>
              </Box>
            )}

            <Box flex={1} overflow="auto" mb={2} border="1px solid #ddd" borderRadius={1} p={2} bgcolor="#fff">
              {loadingMessages && <Typography>Loading messages...</Typography>}
              {uniqueMessages.map(msg => (
                <Box
                  key={msg._id}
                  mb={1}
                  textAlign={msg.senderId === adminUserId ? 'right' : 'left'}
                >
                  <Typography
                    component="span"
                    sx={{
                      bgcolor: msg.senderId === adminUserId ? 'primary.main' : 'grey.300',
                      color: msg.senderId === adminUserId ? 'white' : 'black',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'inline-block',
                      maxWidth: '70%',
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box display="flex" gap={1}>
              <TextField
                variant="outlined"
                placeholder="Type your message..."
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                disabled={sendingMessage}
              />
              <Button variant="contained" onClick={handleSendMessage} disabled={sendingMessage}>
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography>Select a conversation to view messages</Typography>
        )}
      </Box>
    </Box>
  );
}
