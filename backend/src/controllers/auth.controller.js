import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Tout les champs sont obligatoires" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: "le mot de passe doit avoir au moin 6 caractères" });
      }
  
      const user = await User.findOne({ email });
  
      if (user) return res.status(400).json({ message: "Email déjà existant" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      if (newUser) {
        generateToken(newUser._id, res); //je génère le token
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Données d'utilisateur invalide" });
      }
    } catch (error) {
      console.log("Error dans signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Les informations de connexion sont incorrectes" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Les informations de connexion sont incorrectes" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const logout = (req, res) => {
    try {
      res.cookie("jwt_token", "", { maxAge: 0 }); //je reinitialise le token
      res.status(200).json({ message: "Déconnection faite avec succée" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const updateProfile = async (req, res) => { //pour mettre à jour le profile(image) du user
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;

      if (!profilePic) {
        return res.status(400).json({ message: "Image du profile est obligatoire" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: profilePic},
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  