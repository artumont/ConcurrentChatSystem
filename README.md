# 💬 ConcurrentChatSystem

A modern real-time chat application built with Phoenix WebSockets and Next.js, enabling concurrent chat rooms with real-time updates.

(Mainly made to practice elixir)

## 💻 Technologies

- Next.js 15.2.3
- React 19.0.0
- Tailwind CSS 4.0.14
- Phoenix 1.7.20
- Elixir
- TypeScript 5.8.2
- Lucide React 0.483.0

## 🛠️ Prerequisites

- Node.js (v18.17.0 or later)
- pnpm package manager
- Elixir (v1.14 or later)
- Phoenix Framework (v1.7 or later)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/artumont/ConcurrentChatSystem
cd ConcurrentChatSystem
```

2. Install and run backend:
```bash
cd broadcast
mix deps.get
mix phx.server
```

3. Install and run frontend:
```bash
cd client
pnpm install
pnpm dev
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:4000`


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
