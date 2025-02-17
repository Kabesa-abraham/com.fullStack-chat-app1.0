import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const URL_BASIQUE = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [], //pour connaitre les gens enligne
  socket:null,  //pour le socket
 
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket(); //pour se connecter au socket même lorqu'il ya authentification
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Compte crée avec succée");
      get().connectSocket(); //pour se connecter au socket
    } catch (error) {
      toast.error("Quelque chose s'est mal passé");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async(data) =>{
    set({isLoggingIn:true})
    try {
      const res = await axiosInstance.post('/auth/signin', data);
      set({authUser: res.data});
      toast.success("Connexion réussi")
      get().connectSocket(); //pour se connecter au socket
    } catch (error) {
      toast.error("Quelque chose s'est mal passé");
    }finally{
      set({isLoggingIn:false})
    }
  },

  logout: async() =>{
    try {
      await axiosInstance.post('/auth/logout');
      set({authUser:null});
      toast.success("Déconnexion fait avec succée");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Quelque chose s'est mal passé")
    }
  },

  updateProfile: async(data) =>{
    set({isUpdatingProfile: true});
    const formdataImg = new FormData();
    formdataImg.append('image',data);
    try { 
      const res = await fetch(`${URL_BASIQUE}/api/upload/upload_image`,{
        method:'POST',
        headers:{ Accept:'application/json'},
        body:formdataImg
      })
      const data = await res.json();
      if(!res.ok){ console.log(data.message) }
      if(res.ok){
        const res = await axiosInstance.put("/auth/update_profile",{profilePic:data.image_url});
        set({authUser:res.data});
        toast.success("mise à jour faite avec succée");
      }  
    } catch (error) {
      toast.error(error.message)
    }finally{
      set({isUpdatingProfile:false})
    }
  },

  connectSocket: () => {  //connection au socket
    const { authUser } = get(); //on prend authUser
    if (!authUser || get().socket?.connected) return; //si pas de authUser ou si socket est déjà connecté on fait rien

    const socket = io(URL_BASIQUE, {
      query: {
        userId: authUser._id, //je renvoi l'_id du user dans le backend
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => { //donc j'entend l'évenement getOnlineUsers puis je prend les keys qui sont envoyés
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {  //déconnection au socket
    if (get().socket?.connected) get().socket.disconnect();
  },

}))
