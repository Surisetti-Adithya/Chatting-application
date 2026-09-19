import { useMemo, useState } from "react";
import "./App.css";

const initialUsers = [
  {
    id: 1,
    name: "Ava Patel",
    username: "ava",
    status: "Online",
    accent: "purple",
  },
  { id: 2, name: "Liam Chen", username: "liam", status: "Away", accent: "sky" },
  {
    id: 3,
    name: "Maya Flores",
    username: "maya",
    status: "Online",
    accent: "cyan",
  },
  {
    id: 4,
    name: "Noah Brooks",
    username: "noah",
    status: "Offline",
    accent: "amber",
  },
  {
    id: 5,
    name: "Zoe Turner",
    username: "zoe",
    status: "Online",
    accent: "rose",
  },
];

const formatClock = () =>
  new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

const createConversation = (userId, messageText) => ({
  id: Date.now() + Math.random(),
  userId,
  lastMessage: messageText,
  updatedAt: Date.now(),
});

function App() {
  const [screen, setScreen] = useState("login");
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    remember: true,
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState("jordan");
  const [activeChatId, setActiveChatId] = useState(1);
  const [draftMessage, setDraftMessage] = useState("");

  const [conversations, setConversations] = useState([
    {
      id: 1,
      userId: 1,
      lastMessage: "I'll send over the notes before lunch.",
      updatedAt: Date.now() - 1000 * 60 * 5,
    },
    {
      id: 2,
      userId: 2,
      lastMessage: "Can we regroup on the launch plan?",
      updatedAt: Date.now() - 1000 * 60 * 26,
    },
    {
      id: 3,
      userId: 3,
      lastMessage: "The mockup looks good to me.",
      updatedAt: Date.now() - 1000 * 60 * 38,
    },
  ]);

  const [messagesByChat, setMessagesByChat] = useState({
    1: [
      {
        id: 11,
        sender: "them",
        text: "Morning! Want to review the meeting notes?",
        time: "9:15 AM",
      },
      {
        id: 12,
        sender: "me",
        text: "Yes, I can do that after lunch.",
        time: "9:17 AM",
      },
      {
        id: 13,
        sender: "them",
        text: "Perfect. I'll send over the notes before lunch.",
        time: "9:18 AM",
      },
    ],
    2: [
      {
        id: 21,
        sender: "them",
        text: "Are you free to chat about the launch plan?",
        time: "Yesterday",
      },
      {
        id: 22,
        sender: "me",
        text: "Absolutely. Let's talk this afternoon.",
        time: "Yesterday",
      },
    ],
    3: [
      {
        id: 31,
        sender: "them",
        text: "The mockup looks good to me.",
        time: "Mon",
      },
      {
        id: 32,
        sender: "me",
        text: "Great, I'll keep the layout clean and simple.",
        time: "Mon",
      },
    ],
  });

  const chatList = useMemo(
    () =>
      conversations
        .map((conversation) => ({
          ...conversation,
          user: users.find((user) => user.id === conversation.userId),
        }))
        .filter((conversation) => conversation.user)
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [conversations, users],
  );

  const activeConversation =
    chatList.find((conversation) => conversation.id === activeChatId) ||
    chatList[0] ||
    null;

  const activeMessages = activeConversation
    ? messagesByChat[activeConversation.id] || []
    : [];

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      const value = `${user.name} ${user.username}`.toLowerCase();
      return value.includes(normalizedSearch);
    });
  }, [searchTerm, users]);

  const handleLoginChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLoginForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      setLoginError("Please enter your username and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    window.setTimeout(() => {
      setCurrentUser(loginForm.username.trim());
      setLoginLoading(false);
      setScreen("chat");
    }, 450);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const fullName = registerForm.fullName.trim();
    const username = registerForm.username.trim();
    const password = registerForm.password;
    const confirmPassword = registerForm.confirmPassword;

    if (!fullName || !username || !password || !confirmPassword) {
      setRegisterError(
        "Please complete all fields to create your chat account.",
      );
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match. Please try again.");
      return;
    }

    setRegisterLoading(true);
    setRegisterError("");

    window.setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: fullName,
        username,
        status: "Online",
        accent: "indigo",
      };

      const newChatId = Date.now() + 1000;
      const welcomeMessage = "Hi! I’m ready to start messaging.";

      setUsers((previous) => [newUser, ...previous]);
      setConversations((previous) => [
        createConversation(newUser.id, welcomeMessage),
        ...previous,
      ]);
      setMessagesByChat((previous) => ({
        ...previous,
        [newChatId]: [
          {
            id: Date.now() + 2000,
            sender: "them",
            text: welcomeMessage,
            time: formatClock(),
          },
        ],
      }));

      setRegisterForm({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setRegisterLoading(false);
      setLoginForm({ username, password: "", remember: true });
      setScreen("login");
    }, 550);
  };

  const openConversation = (conversationId) => {
    setActiveChatId(conversationId);
    setDraftMessage("");
  };

  const selectUser = (user) => {
    const matchingConversation = conversations.find(
      (conversation) => conversation.userId === user.id,
    );

    if (matchingConversation) {
      openConversation(matchingConversation.id);
      return;
    }

    const conversationId = Date.now() + Math.random();
    const firstMessage = `Hi ${user.name.split(" ")[0]}!`;

    setConversations((previous) => [
      {
        id: conversationId,
        userId: user.id,
        lastMessage: firstMessage,
        updatedAt: Date.now(),
      },
      ...previous,
    ]);
    setMessagesByChat((previous) => ({
      ...previous,
      [conversationId]: [
        {
          id: Date.now() + 101,
          sender: "them",
          text: firstMessage,
          time: formatClock(),
        },
      ],
    }));
    setActiveChatId(conversationId);
    setDraftMessage("");
  };

  const handleSendMessage = () => {
    if (!draftMessage.trim() || !activeConversation) {
      return;
    }

    const messageText = draftMessage.trim();
    const nextMessage = {
      id: Date.now(),
      sender: "me",
      text: messageText,
      time: formatClock(),
    };

    setMessagesByChat((previous) => ({
      ...previous,
      [activeConversation.id]: [
        ...(previous[activeConversation.id] || []),
        nextMessage,
      ],
    }));

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, lastMessage: messageText, updatedAt: Date.now() }
          : conversation,
      ),
    );

    setDraftMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const showLoginScreen = () => {
    setScreen("login");
    setLoginError("");
  };

  const renderBrandPanel = () => (
    <section className="brand-panel">
      <div className="brand-badge">Chatly</div>
      <h1>Private messaging that feels effortless.</h1>
      <p className="brand-copy">
        Keep every conversation in one simple chat app designed for focused,
        one-to-one messaging.
      </p>

      <div className="feature-list" aria-label="Chat app features">
        <div className="feature-item">
          <span className="feature-dot" aria-hidden="true"></span>
          One-to-one conversations
        </div>
        <div className="feature-item">
          <span className="feature-dot" aria-hidden="true"></span>
          Clear, private chat history
        </div>
        <div className="feature-item">
          <span className="feature-dot" aria-hidden="true"></span>
          Quick replies in one place
        </div>
      </div>
    </section>
  );

  if (screen === "login") {
    return (
      <main className="chat-shell">
        {renderBrandPanel()}

        <section className="login-panel">
          <div className="login-card">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your chat account</h2>

            <form
              className="login-form"
              onSubmit={handleLoginSubmit}
              noValidate
            >
              <label>
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
              </label>

              <div className="form-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={loginForm.remember}
                    onChange={handleLoginChange}
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {loginError ? (
                <p className="form-message error-message">{loginError}</p>
              ) : null}

              <div className="login-actions">
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing in..." : "Sign in"}
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setScreen("register")}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "register") {
    return (
      <main className="chat-shell">
        {renderBrandPanel()}

        <section className="login-panel">
          <div className="login-card">
            <p className="eyebrow">Create account</p>
            <h2>Join the chat app</h2>

            <form
              className="login-form"
              onSubmit={handleRegisterSubmit}
              noValidate
            >
              <label>
                <span>Full name</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                />
              </label>

              <label>
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
              </label>

              <label>
                <span>Confirm password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </label>

              {registerError ? (
                <p className="form-message error-message">{registerError}</p>
              ) : null}

              <div className="login-actions">
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={registerLoading}
                >
                  {registerLoading ? "Creating account..." : "Create account"}
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={showLoginScreen}
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="chat-shell chat-shell--app">
      <aside className="sidebar-panel">
        <div className="sidebar-header">
          <div className="profile-block">
            <div className="profile-avatar">
              {currentUser.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <strong>{currentUser}</strong>
              <span>Available</span>
            </div>
          </div>
          <button type="button" className="ghost-btn" onClick={showLoginScreen}>
            Logout
          </button>
        </div>

        <label className="search-box">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search people"
          />
        </label>

        <div className="sidebar-section">
          <div className="section-header">
            <h3>People</h3>
          </div>

          <div className="user-list">
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className={`user-row ${activeConversation?.user?.id === user.id ? "is-active" : ""}`}
                  onClick={() => selectUser(user)}
                >
                  <span className={`user-avatar ${user.accent}`}>
                    {user.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="user-copy">
                    <strong>{user.name}</strong>
                    <small>{user.status}</small>
                  </span>
                </button>
              ))
            ) : (
              <p className="empty-state">No matching people found.</p>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-header">
            <h3>Chats</h3>
          </div>

          <div className="conversation-list">
            {chatList.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`conversation-card ${activeChatId === conversation.id ? "is-active" : ""}`}
                onClick={() => openConversation(conversation.id)}
              >
                <span
                  className={`user-avatar ${conversation.user?.accent || "indigo"}`}
                >
                  {conversation.user?.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="conversation-copy">
                  <strong>{conversation.user?.name}</strong>
                  <small>{conversation.lastMessage}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="conversation-panel">
        {activeConversation ? (
          <>
            <header className="conversation-header">
              <div className="profile-block large">
                <span
                  className={`user-avatar ${activeConversation.user?.accent || "indigo"}`}
                >
                  {activeConversation.user?.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <strong>{activeConversation.user?.name}</strong>
                  <span>{activeConversation.user?.status}</span>
                </div>
              </div>
            </header>

            <div className="message-list" aria-live="polite">
              {activeMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message-row ${message.sender === "me" ? "mine" : "theirs"}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span>{message.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="composer">
              <textarea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message…"
                rows={1}
              />
              <button
                type="button"
                className="primary-btn send-btn"
                onClick={handleSendMessage}
                disabled={!draftMessage.trim()}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="empty-chat">Select a person to start chatting.</div>
        )}
      </section>
    </main>
  );
}

export default App;
