import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //ce la signifie qu'on prend tout les users dont le _id n'est pas égal ($ne) à celui de loggedInUserId
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getMessages = async (req, res) => {
    try {
      const { id: userReceivedId } = req.params;
      const senderId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: userReceivedId },
          { senderId: userReceivedId, receiverId: senderId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { reveivedId: receiverId } = req.params;
      const senderId = req.user._id;
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: image,
      });
  
      await newMessage.save();
  
     const receiverSocketId = getReceiverSocketId(receiverId); //pour avoir le socketId de l'utilisateur à qui j'enverrai le message grâce à cette fonction
     if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); //donc j'envoi à receiverSocketId ce message
     }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  