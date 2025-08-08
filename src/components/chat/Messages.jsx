import { useContext, useState, useEffect, useRef } from "react";

import { Box, styled } from "@mui/material";


import Footer from "./Footer";
import Message from "./Message";
const AccountContext = {};
const getMessages = () => { };
const newMessage = "";

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 76vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  const account = { userId: 'test-user-id', name: 'Jaydip' };
  const socket = null;
  const newMessageFlag = false;
  const setnewMessageFlag = () => { };


  useEffect(() => {
  const dummyIncoming = {
    senderId: 'other-user',
    text: 'Hello! This is a dummy incoming message.',
    createdAt: Date.now(),
    type: 'text'
  };

  const timeout = setTimeout(() => {
    setIncomingMessage(dummyIncoming);
  }, 3000);

  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    }
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag])

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' }), 777);
  }, [messages]);

  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages(prev => [...prev, incomingMessage])
  }, [incomingMessage, conversation]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code == 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub || person.userId,
          conversationId: conversation._id,
          type: 'text',
          text: value
        }
      } else {
        message = {
          senderId: account.sub|| person.userId,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'file',
          text: image
        }
      }

      socket.current.emit('sendMessage', message);

      await newMessage(message);

      setValue('');
      setFile('');
      setImage('');
      setnewMessageFlag(prev => !prev);

    }
  }
  return (
    <Wrapper>
      <Component>
        {
          messages && messages.map(message => (
            <Container ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))
        }
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  )
}

export default Messages;