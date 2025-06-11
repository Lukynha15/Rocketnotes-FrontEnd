import { RiShutDownLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { Container, Logout, Profile } from "./styles";

export function Header() {
  const { signOut, user } = useAuth();

  const navigation = useNavigate();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  function handleSignOut() {
    navigation("/");
    signOut();
  };

  return (
    <Container>
      <Profile to="/profile">
        <img 
          src={avatarUrl}
          alt="Foto de perfil" 
        />

        <div>
          <span>Bem vindo!</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}><RiShutDownLine/></Logout>

    </Container>
  )
}