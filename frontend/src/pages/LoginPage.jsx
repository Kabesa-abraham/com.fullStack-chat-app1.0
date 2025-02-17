import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Podcast } from "lucide-react";


const LoginPage = () => {

  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });
  const {login,isLoggingIn} = useAuthStore();

  const handleSubmit = (e) =>{
    e.preventDefault();
    login(formData)
  }

  return (
    <div className="h-screen max-w-7xl mx-auto grid lg:grid-cols-2">
    {/* coté gauche - Form */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors animate-pulse "
            >
              <Podcast className="w-6 h-6 text-blue-800" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Bienvenue</h1>
            <p className="text-base-content/60">Connectez-vous</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="tonemail@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Mot de passe</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-full text-white" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                En attente...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Vous n'avez pas de compte?{" "}
            <Link to="/signup" className="link link-success">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* côté gauche - Image/Pattern */}
    <AuthImagePattern
      title={"Bienvenue dans RD-Chat !"}
      subtitle={"Connectez-vous pour ainsi continuer vos conversations."}
    />
  </div>
  )
}

export default LoginPage
