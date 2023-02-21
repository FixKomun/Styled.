import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function User() {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    return (
      <div>
        <FaUserCircle />
        <a href="http://localhost:3000/api/auth/login">
          <h3>Login</h3>
        </a>
      </div>
    );
  }
  return (
    <Profile onClick={() => router.push("/profile")}>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
      <a href="http://localhost:3000/api/auth/logout">
        <h3>Logout</h3>
      </a>
    </Profile>
  );
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
