import { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";

import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
const person = { name: "Test User", image: "https://via.placeholder.com/40" };
const conversation = {};

const ChatBox = ()=>{

    return(
        <Box style={{height: '75%'}}>
            <ChatHeader person={person}/>
            <Messages person={person} conversation={conversation}/>
        </Box>
    )
}

export default ChatBox;