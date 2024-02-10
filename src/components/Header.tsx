import { useState } from "react";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { User } from "@supabase/supabase-js";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { supabaseClient } from "../service/supabase";
const { Header: AntHeader } = Layout;

const Header = ({ user }: { user: User | null }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const onLogout = () => supabaseClient.auth.signOut();
  return (
    <div>
      <LoginModal
        isModalOpen={loginModal}
        onClose={() => setLoginModal(false)}
      />
      <SignUpModal
        isModalOpen={signUpModal}
        onClose={() => setSignUpModal(false)}
      />

      <AntHeader
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white", fontSize: "1.5rem", cursor: "pointer" }}>
          Real Time Chat App
          
        </div>
        <div style={{ display: "flex" }}>
          {!user ? (
            <>
              <div
                style={{
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setLoginModal(true)}
              >
                Login
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: ".9rem",
                  padding: "0 1em",
                }}
              >
                or
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setSignUpModal(true)}
              >
                Sign Up
              </div>
            </>
          ) : (
            <div
              style={{ color: "white", fontSize: "1rem", cursor: "default" }}
            >
              ({user.email}) -{" "}
              <span onClick={onLogout} style={{ cursor: "pointer" }}>
                Logout
              </span>
            </div>
          )}
        </div>
      </AntHeader>
    </div>
  );
};

export default Header;
