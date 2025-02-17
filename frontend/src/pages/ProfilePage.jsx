import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null); //pour l'image

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImg(URL.createObjectURL(file))
    await updateProfile(file)
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl shadow-sm hover:shadow-xl hover:shadow-green-50 duration-1000 p-6 space-y-3">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Informations sur ton Profile</p>
          </div>

          {/*upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt=""
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="profile-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
               >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                  hidden
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "En chargement..." : "Cliquer sur l'icône caméra pour charger votre profile image"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom complet
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Adresse Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Informations du compte</h2>
            <div className="flex justify-between items-center text-sm">
              <div className="flex flex-col items-center py-2">
                <span className="font-semibold" >Membre depuis</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center flex-col py-2">
                <span className="font-semibold" >Status du Compte </span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
