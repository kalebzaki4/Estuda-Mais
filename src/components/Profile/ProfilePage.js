// src/components/Profile/ProfilePage.js
import React, { useState, useRef } from 'react';

// Dados de exemplo para o perfil do usuário
const userProfile = {
  name: 'Kaleb Zaki',
  email: 'kalebzaki@example.com',
  bio: 'Entusiasta de tecnologia e estudante apaixonado por desenvolvimento web e inteligência artificial. Sempre em busca de novos conhecimentos e desafios.',
  avatarUrl: 'https://placehold.co/150x150/8a2be2/FFFFFF?text=KZ', // Placeholder com iniciais
  joinedDate: 'Janeiro de 2023',
  totalCourses: 8,
  activeCourses: 3,
  achievementsCount: 12,
};

// Dados de exemplo para os amigos
const friends = [
  { id: 1, name: 'João Silva', avatar: 'JS', status: 'Online', lastActivity: 'Estudou React' },
  { id: 2, name: 'Maria Souza', avatar: 'MS', status: 'Offline', lastActivity: 'Concluiu curso de Python' },
  { id: 3, name: 'Pedro Alves', avatar: 'PA', status: 'Online', lastActivity: 'Iniciou Pomodoro' },
  { id: 4, name: 'Ana Costa', avatar: 'AC', status: 'Offline', lastActivity: 'Revisou CSS' },
  { id: 5, name: 'Lucas Lima', avatar: 'LL', status: 'Online', lastActivity: 'Explorando novos cursos' },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(userProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...userProfile});
  const fileInputRef = useRef(null);

  // Função para lidar com a alteração de foto de perfil
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatarUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para abrir o seletor de arquivo
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Função para salvar as alterações do perfil
  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditedProfile({...profile});
    setIsEditingProfile(false);
  };

  // Função para lidar com a alteração dos campos do perfil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    // Container principal com fundo escuro
    <div className="min-h-[calc(100vh-160px)] p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple mb-8 text-center font-inter animate-fade-in">
        Seu Perfil
      </h2>

      {/* Seção de Informações do Perfil */}
      <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark mb-12 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 animate-fade-in delay-100">
        <div className="flex-shrink-0 relative group">
          <img
            src={isEditingProfile ? editedProfile.avatarUrl : profile.avatarUrl}
            alt="Avatar do Usuário"
            className="w-32 h-32 rounded-full object-cover border-4 border-accent-purple-light shadow-md"
          />
          {isEditingProfile && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
              onClick={handleAvatarClick}
            >
              <span className="text-white text-sm font-medium">Alterar foto</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          )}
        </div>
        <div className="text-center md:text-left w-full">
          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-text-muted-dark text-sm mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleProfileChange}
                  className="w-full bg-bg-dark-tertiary border border-border-dark rounded-lg px-4 py-2 text-text-light focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-text-muted-dark text-sm mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleProfileChange}
                  className="w-full bg-bg-dark-tertiary border border-border-dark rounded-lg px-4 py-2 text-text-light focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-text-muted-dark text-sm mb-1">Biografia</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full bg-bg-dark-tertiary border border-border-dark rounded-lg px-4 py-2 text-text-light focus:outline-none focus:ring-2 focus:ring-accent-purple"
                ></textarea>
              </div>
              <div className="flex space-x-4 justify-center md:justify-start">
                <button 
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-bg-dark-hover hover:bg-bg-dark-tertiary text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-text-light mb-2 font-inter">{profile.name}</h3>
              <p className="text-text-muted-dark text-lg mb-4">{profile.email}</p>
              <p className="text-text-light text-base leading-relaxed max-w-2xl">{profile.bio}</p>
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-text-muted-dark text-sm">
                <span>Membro desde: <span className="font-semibold text-text-light">{profile.joinedDate}</span></span>
                <span>Cursos Totais: <span className="font-semibold text-text-light">{profile.totalCourses}</span></span>
                <span>Cursos Ativos: <span className="font-semibold text-text-light">{profile.activeCourses}</span></span>
                <span>Conquistas: <span className="font-semibold text-text-light">{profile.achievementsCount}</span></span>
              </div>
              <button 
                onClick={() => setIsEditingProfile(true)}
                className="mt-8 px-6 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105"
              >
                Editar Perfil
              </button>
            </>
          )}
        </div>
      </section>

      {/* Seção de Amigos */}
      <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark animate-fade-in delay-200">
        <h3 className="text-2xl font-bold text-text-light mb-6 font-inter">Seus Amigos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map(friend => (
            <div key={friend.id} className="bg-bg-dark-tertiary p-5 rounded-lg shadow-md border border-border-dark flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center text-lg font-bold text-text-light flex-shrink-0">
                {friend.avatar}
              </div>
              <div>
                <h4 className="text-xl font-semibold text-text-light">{friend.name}</h4>
                <p className={`text-sm ${friend.status === 'Online' ? 'text-success-green' : 'text-error-red'}`}>
                  {friend.status}
                </p>
                <p className="text-text-muted-dark text-xs mt-1">Última atividade: {friend.lastActivity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-info-blue hover:bg-blue-700 text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105">
            Encontrar Amigos
          </button>
        </div>
      </section>
    </div>
  );
}
