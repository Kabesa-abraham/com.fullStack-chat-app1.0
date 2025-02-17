import { useRef, useState } from "react";
import { useChatStore } from "../store/useChattingStore.js";
import { Image, Loader2, Send, SendHorizonal, X } from "lucide-react";
import toast from "react-hot-toast";
import AutoResizeTextarea from "./AutoResizeTextarea.jsx";

const URL_BASIQUE = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null); //Va contenir l'image avant son envoi
  const [imageToSend,setImageToSend] = useState(null); //le state image qu'on va envoyé dans le backend pour l'upload
  const fileInputRef = useRef(null);
  const { sendMessage,isSendingMessage } = useChatStore(); //pour envoyer un message

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) { //pour savoir si le file selectionné est vraiment une image
      toast.error("S'il vous plait sélectionner un fichier image!");
      return;
    }
    setImagePreview(URL.createObjectURL(file))
    setImageToSend(file)
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageToSend(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return; //si pas de texte ou image alors on retourne rien

    let imageUrl = null
    //upload image
    if(imageToSend){ //si l'image a envoyé existe
      const formdataImg = new FormData();
      formdataImg.append('image',imageToSend);
      try { 
        const res = await fetch(`${URL_BASIQUE}/upload/upload_image`,{
          method:'POST',
          headers:{ Accept:'application/json'},
          body:formdataImg
        })
        const data = await res.json();
        if(!res.ok){ console.log(data.message) }
        imageUrl = data.image_url;
      } catch (error) {console.log(error)}
    }

    try {
      await sendMessage({ 
        text: text.trim(),
        image: imageUrl,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      setImageToSend(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) { console.error("Failed to send message:", error);}
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <AutoResizeTextarea value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder={"Message"}
          />

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`flex justify-center items-center
                     ${imagePreview ? "text-emerald-500" : "text-emerald-800"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle bg-success text-success-content"
          disabled={!text.trim() && !imagePreview} //ce bouton sera disabled si il n'ya pas de text ou image
        >
        {
          isSendingMessage===true? <Loader2 size={18} color="white" /> : <SendHorizonal size={22} />
        }
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
