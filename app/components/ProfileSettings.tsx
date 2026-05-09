import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../context/AppContext";

interface ProfileSettingsProps {
  onBack: () => void;
  onLogout?: () => void;
}

export function ProfileSettings({
  onBack,
  onLogout,
}: ProfileSettingsProps) {
  const {
    userProfile,
    setUserProfile,
    userType,
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
  } = useApp();
  const [activeSection, setActiveSection] = useState<
    "menu" | "profile" | "settings"
  >("menu");

  // Cores dinâmicas baseadas no tipo de utilizador
  const primaryColor =
    userType === "formando" ? "#0b87ac" : "#4aa540";
  const secondaryColor =
    userType === "formando" ? "#096d8a" : "#3d8935";

  // Cores dinâmicas para o tema escuro
  const darkPrimaryColor =
    userType === "formando" ? "#0b87ac" : "#4aa540";
  const darkSecondaryColor =
    userType === "formando" ? "#096d8a" : "#3d8935";

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [location, setLocation] = useState(
    userProfile.location,
  );
  const [bio, setBio] = useState(userProfile.bio);
  const [expertise, setExpertise] = useState(
    userProfile.expertise,
  );

  // Estado para equipas (apenas para formandos)
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [loadingTeams, setLoadingTeams] = useState(false);

  // Estado para criação de nova equipa
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [creatingTeam, setCreatingTeam] = useState(false);

  // Buscar equipas disponíveis quando entrar na edição de perfil (apenas para formandos)
  useEffect(() => {
    if (activeSection === 'profile' && userType === 'formando') {
      fetchTeams();
    }
  }, [activeSection, userType]);

  const fetchTeams = async () => {
    setLoadingTeams(true);
    try {
      const response = await fetch(
        `/api/teams`,
        {
          headers: {
            ,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar equipas');
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.teams)) {
        setTeams(data.teams);
        console.log('[ProfileSettings] Equipas carregadas:', data.teams.length);
      }
    } catch (error) {
      console.error('[ProfileSettings] Erro ao carregar equipas:', error);
      toast.error('Erro ao carregar equipas');
    } finally {
      setLoadingTeams(false);
    }
  };

  // Função para criar nova equipa
  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      toast.error('Por favor, insira o nome da equipa');
      return;
    }

    setCreatingTeam(true);
    console.log('[ProfileSettings] A criar nova equipa:', newTeamName);

    try {
      const response = await fetch(
        `/api/teams`,
        {
          method: 'POST',
          headers: {
            ,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newTeamName.trim(),
            courseId: 'forScrum', // ID do curso padrão
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao criar equipa');
      }

      console.log('[ProfileSettings] Equipa criada com sucesso:', data.team);
      toast.success('Equipa criada com sucesso!');
      
      // Limpar formulário e fechar
      setNewTeamName('');
      setShowCreateTeam(false);
      
      // Recarregar lista de equipas e selecionar a nova
      await fetchTeams();
      if (data.team && data.team.id) {
        setSelectedTeamId(data.team.id);
      }
    } catch (error: any) {
      console.error('[ProfileSettings] Erro ao criar equipa:', error);
      toast.error(error.message || 'Erro ao criar equipa');
    } finally {
      setCreatingTeam(false);
    }
  };

  // Função para guardar as alterações do perfil
  const handleSave = () => {
    // Atualizar o contexto com os novos dados
    setUserProfile({
      ...userProfile,
      name,
      email,
      phone,
      location,
      bio,
      expertise,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    });

    toast.success("Perfil atualizado com sucesso!");
    setTimeout(() => {
      setActiveSection("menu");
    }, 1000);
  };

  // Menu principal do perfil
  if (activeSection === "menu") {
    return (
      <div className="bg-[#f0f0f0] min-h-screen w-full font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] pb-24 pt-[120px] dark:bg-slate-900 transition-colors duration-200">
        {/* Cabeçalho COMPACTO com gradiente dinâmico adaptável ao tema */}
        <div
          className="px-6 pt-6 pb-3 rounded-b-[20px] shadow-md fixed top-0 left-0 right-0 z-50"
          style={{
            background: theme === 'dark'
              ? `linear-gradient(135deg, ${darkPrimaryColor} 0%, ${darkSecondaryColor} 100%)`
              : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          <div className="max-w-[390px] mx-auto">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={onBack}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="text-white" size={20} />
              </button>
              <h1 className="text-white text-[18px]">Perfil</h1>
              <div className="w-9" /> {/* Spacer */}
            </div>

            {/* Profile Photo - COMPACTO */}
            <div className="flex items-center gap-3 mt-3">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-[20px] shadow-lg"
                  style={{
                    background: userType === "formando"
                      ? "linear-gradient(135deg, #0b87ac 0%, #096d8a 100%)"
                      : "linear-gradient(135deg, #4aa540 0%, #3d8935 100%)",
                  }}
                >
                  {userProfile.avatar}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-white text-[16px]">
                  {userProfile.name}
                </h2>
                <p className="text-white/80 text-[12px]">
                  {userProfile.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options - MAIS ESPAÇO NO TOPO */}
        <div className="max-w-[390px] mx-auto px-6 pt-3 space-y-3">
          <button
            onClick={() => setActiveSection("profile")}
            className="w-full bg-white rounded-[16px] p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between border-2 border-transparent dark:bg-slate-800 dark:hover:bg-slate-700"
            style={{
              borderColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = primaryColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor =
                "transparent")
            }
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center dark:bg-blue-900/20">
                <User
                  size={22}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div className="text-left">
                <h3 className="text-[16px] text-slate-800 mb-0.5 dark:text-slate-200">
                  Meu Perfil
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">
                  Editar informações pessoais
                </p>
              </div>
            </div>
            <ChevronRight
              className="text-slate-400"
              size={22}
            />
          </button>

          <button
            onClick={() => setActiveSection("settings")}
            className="w-full bg-white rounded-[16px] p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between border-2 border-transparent dark:bg-slate-800 dark:hover:bg-slate-700"
            style={{
              borderColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = primaryColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor =
                "transparent")
            }
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center dark:bg-purple-900/20">
                <Settings
                  size={22}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="text-left">
                <h3 className="text-[16px] text-slate-800 mb-0.5 dark:text-slate-200">
                  Configurações
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">
                  Preferências e notificações
                </p>
              </div>
            </div>
            <ChevronRight
              className="text-slate-400"
              size={22}
            />
          </button>

          {/* Botão de Sair */}
          <div className="pt-4 border-t border-slate-200 mt-6 dark:border-slate-700">
            <button
              onClick={() => {
                if (onLogout) {
                  toast.success(
                    "Sessão terminada com sucesso!",
                  );
                  setTimeout(() => {
                    onLogout();
                  }, 800);
                }
              }}
              className="w-full bg-red-50 rounded-[16px] p-4 shadow-sm hover:shadow-md hover:bg-red-100 transition-all flex items-center justify-between border-2 border-transparent hover:border-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:hover:border-red-500/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900/30">
                  <LogOut
                    size={22}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-[16px] text-red-700 mb-0.5 dark:text-red-400">
                    Terminar Sessão
                  </h3>
                  <p className="text-[13px] text-red-500 dark:text-red-300">
                    Sair da plataforma forScrum
                  </p>
                </div>
              </div>
              <ChevronRight
                className="text-red-400"
                size={22}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Editar Perfil
  if (activeSection === "profile") {
    return (
      <div className="bg-[#f0f0f0] min-h-screen w-full font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] pb-24 dark:bg-slate-900 transition-colors duration-200">
        {/* Header com adaptação ao tema */}
        <div 
          className="px-6 pt-12 pb-6 rounded-b-[24px] shadow-lg"
          style={{
            background: theme === 'dark'
              ? `linear-gradient(135deg, ${darkPrimaryColor} 0%, ${darkSecondaryColor} 100%)`
              : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          <div className="max-w-[390px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setActiveSection("menu")}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-white text-[20px]">
                Editar Perfil
              </h1>
              <button
                onClick={handleSave}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <Save className="text-white" size={24} />
              </button>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-[32px]"
                  style={{
                    background: userType === "formando"
                      ? "linear-gradient(135deg, #0b87ac 0%, #096d8a 100%)"
                      : "linear-gradient(135deg, #4aa540 0%, #3d8935 100%)",
                  }}
                >
                  {userProfile.avatar}
                </div>
                <button
                  onClick={() =>
                    toast.info("Alterar foto de perfil")
                  }
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors dark:bg-slate-800"
                >
                  <Camera
                    size={16}
                    style={{ color: primaryColor }}
                  />
                </button>
              </div>
              <p className="text-white/80 text-[12px] mt-2">
                Clique para alterar foto
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-[390px] mx-auto px-6 py-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block dark:text-slate-300">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block flex items-center gap-2 dark:text-slate-300">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block flex items-center gap-2 dark:text-slate-300">
              <Phone size={16} />
              Telefone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block flex items-center gap-2 dark:text-slate-300">
              <MapPin size={16} />
              Localização
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Equipa - APENAS para formandos */}
          {userType === 'formando' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] text-slate-700 flex items-center gap-2 dark:text-slate-300">
                  <Users size={16} />
                  Equipa
                </label>
                <button
                  onClick={() => setShowCreateTeam(!showCreateTeam)}
                  className="text-[#0b87ac] text-[13px] hover:underline flex items-center gap-1"
                >
                  {showCreateTeam ? 'Cancelar' : '+ Adicionar Equipa'}
                </button>
              </div>

              {showCreateTeam ? (
                // Formulário inline para criar nova equipa
                <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-[#0b87ac]/30 rounded-[12px] p-4 space-y-3">
                  <p className="text-[12px] text-slate-600 dark:text-slate-400">
                    Criar Nova Equipa
                  </p>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Nome da equipa"
                    className="w-full bg-white border-2 border-slate-200 rounded-[10px] px-3 py-2.5 text-[14px] focus:outline-none focus:border-[#0b87ac] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateTeam();
                      }
                    }}
                  />
                  <button
                    onClick={handleCreateTeam}
                    disabled={creatingTeam || !newTeamName.trim()}
                    className="w-full bg-[#0b87ac] text-white py-2.5 rounded-[10px] text-[14px] hover:bg-[#096d8a] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {creatingTeam ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>A criar...</span>
                      </>
                    ) : (
                      <>
                        <Users size={16} />
                        <span>Criar Equipa</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // Seletor de equipa existente
                <>
                  {loadingTeams ? (
                    <div className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] text-slate-400 dark:bg-slate-800 dark:border-slate-700">
                      A carregar equipas...
                    </div>
                  ) : (
                    <select
                      value={selectedTeamId}
                      onChange={(e) => setSelectedTeamId(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#0b87ac] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                      <option value="">Sem equipa atribuída</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    Selecione a equipa à qual pertence ou crie uma nova
                  </p>
                </>
              )}
            </div>
          )}

          {/* Expertise */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block flex items-center gap-2 dark:text-slate-300">
              <Briefcase size={16} />
              Áreas de Especialização
            </label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              placeholder="Ex: forScrum , Product Owner..."
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-[14px] text-slate-700 mb-2 block dark:text-slate-300">
              Biografia
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#4aa540] transition-colors resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              placeholder="Conte um pouco sobre você..."
            />
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[14px] text-slate-700 dark:text-slate-300">
                Certificações
              </label>
              <button
                onClick={() =>
                  toast.info("Adicionar certificação")
                }
                className="text-[#4aa540] text-[13px] hover:underline"
              >
                + Adicionar
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-white border-2 border-slate-200 rounded-[12px] p-3 flex items-center justify-between dark:bg-slate-800 dark:border-slate-700">
                <div>
                  <p className="text-[13px] text-slate-800 dark:text-slate-200">
                    foScrum
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Formador de forScrum 
                  </p>
                </div>
                <CheckCircle
                  className="text-green-500"
                  size={20}
                />
              </div>
              <div className="bg-white border-2 border-slate-200 rounded-[12px] p-3 flex items-center justify-between dark:bg-slate-800 dark:border-slate-700">
                <div>
                  <p className="text-[13px] text-slate-800 dark:text-slate-200">
                   Formador de Informátic
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Scrum.org • 2019
                  </p>
                </div>
                <CheckCircle
                  className="text-green-500"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#4aa540] text-white py-4 rounded-[16px] text-[16px] hover:bg-[#3d8935] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Guardar Alterações
          </button>

          <div className="pb-8" />
        </div>
      </div>
    );
  }

  // Configurações
  if (activeSection === "settings") {
    return (
      <div className="bg-[#f0f0f0] min-h-screen w-full font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] pb-24 dark:bg-slate-900 transition-colors duration-200">
        {/* Header com adaptação ao tema */}
        <div 
          className="px-6 pt-12 pb-6 rounded-b-[24px] shadow-lg"
          style={{
            background: theme === 'dark'
              ? `linear-gradient(135deg, ${darkPrimaryColor} 0%, ${darkSecondaryColor} 100%)`
              : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          <div className="max-w-[390px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setActiveSection("menu")}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-white text-[20px]">
                Configurações
              </h1>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center text-white text-[36px] shadow-lg"
                  style={{
                    background: userType === "formando"
                      ? "linear-gradient(135deg, #0b87ac 0%, #096d8a 100%)"
                      : "linear-gradient(135deg, #4aa540 0%, #3d8935 100%)",
                  }}
                >
                  {userProfile.avatar}
                </div>
                <button
                  onClick={() =>
                    toast.info("Alterar foto de perfil")
                  }
                  className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-lg hover:bg-slate-50 transition-colors dark:bg-slate-800"
                >
                  <Camera
                    size={18}
                    style={{ color: primaryColor }}
                  />
                </button>
              </div>
              <h2 className="text-white text-[22px] mt-4 mb-1">
                {userProfile.name}
              </h2>
              <p className="text-white/80 text-[14px]">
                {userProfile.email}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="max-w-[390px] mx-auto px-6 py-6 space-y-5">
          {/* Notifications */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-[14px] text-slate-800 mb-3 dark:text-slate-200">
              Notificações
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[13px] text-slate-600 dark:text-slate-400">
                  Notificações por email
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-[#4aa540]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[13px] text-slate-600 dark:text-slate-400">
                  Notificações push
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-[#4aa540]"
                />
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-[14px] text-slate-800 mb-3 dark:text-slate-200">
              Privacidade
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[13px] text-slate-600 dark:text-slate-400">
                  Perfil público
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-[#4aa540]"
                />
              </label>
            </div>
          </div>
          
          {/* Acessibilidade */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-[14px] text-slate-800 mb-3 dark:text-slate-200">
              Acessibilidade
            </h3>
            <div className="space-y-4">
              {/* Modo Escuro */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Moon size={16} className="text-slate-600 dark:text-slate-400" />
                    ) : (
                      <Sun size={16} className="text-slate-600 dark:text-slate-400" />
                    )}
                    <label className="text-[13px] text-slate-600 dark:text-slate-400">
                      Modo Escuro
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      toggleTheme();
                      toast.success(
                        theme === 'dark' 
                          ? 'Modo claro ativado' 
                          : 'Modo escuro ativado'
                      );
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme === 'dark'
                        ? 'bg-[#4aa540] focus:ring-[#4aa540]'
                        : 'bg-slate-300 focus:ring-slate-400'
                    }`}
                    role="switch"
                    aria-checked={theme === 'dark'}
                    aria-label="Alternar modo escuro"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reduz o brilho do ecrã e melhora a leitura em ambientes escuros
                </p>
              </div>

              {/* Tamanho da Letra */}
              <div>
                <label className="text-[13px] text-slate-600 dark:text-slate-400 block mb-2">
                  Tamanho da Letra
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setFontSize('normal');
                      toast.success('Tamanho da letra: Normal');
                    }}
                    className={`py-2 px-3 rounded-lg text-[12px] font-medium transition-all ${
                      fontSize === 'normal'
                        ? 'bg-[#4aa540] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => {
                      setFontSize('large');
                      toast.success('Tamanho da letra: Grande');
                    }}
                    className={`py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
                      fontSize === 'large'
                        ? 'bg-[#4aa540] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Grande
                  </button>
                  <button
                    onClick={() => {
                      setFontSize('extra-large');
                      toast.success('Tamanho da letra: Muito Grande');
                    }}
                    className={`py-2 px-3 rounded-lg text-[14px] font-medium transition-all ${
                      fontSize === 'extra-large'
                        ? 'bg-[#4aa540] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Muito Grande
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  Ajusta o tamanho do texto em toda a aplicação para melhor leitura
                </p>
              </div>
            </div>
          </div> 
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#4aa540] text-white py-4 rounded-[16px] text-[16px] hover:bg-[#3d8935] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Guardar Alterações
          </button>

          <div className="pb-8" />
        </div>
      </div>
    );
  }

  return null;
}