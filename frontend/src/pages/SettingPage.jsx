import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! comment tu vas?", isSent: false },
  { id: 2, content: "je vais très bien! Là je suis entrain de travailler.", isSent: true },
];

const SettingPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Thème</h2>
          <p className="text-sm text-base-content/70">Choisi un Thème pour ton interface de chat</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-300  animate-pulse" : "hover:bg-base-200/50 hover:scale-110"}
              `}
              onClick={() => setTheme(t)}
             >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)} {/*le 1ère caractère je met en uppercase et j'affiche les autre char sans tenir compte du 1ère */}
              </span>
            </button>
          ))}
        </div>

        {/* Section rendu */}
        <h3 className="text-lg font-semibold mb-3">Rendu UI</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg hover:shadow-blue-200 duration-500 ">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
    
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      Z
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Zinzine zidan</h3>
                      <p className="text-xs text-base-content/70">En ligne</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      value="Ce ci est un rendu"
                      readOnly
                    />
                    <button className="btn bg-primary h-10 min-h-0 text-primary-content ">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage
