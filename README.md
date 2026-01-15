# Stackvo UI - Modern Docker Management Dashboard

[![Docker Hub](https://img.shields.io/docker/v/stackvo/stackvo-ui?label=Docker%20Hub)](https://hub.docker.com/r/stackvo/stackvo-ui)
[![Docker Image Size](https://img.shields.io/docker/image-size/stackvo/stackvo-ui/latest)](https://hub.docker.com/r/stackvo/stackvo-ui)
[![Docker Pulls](https://img.shields.io/docker/pulls/stackvo/stackvo-ui)](https://hub.docker.com/r/stackvo/stackvo-ui)
[![Build Status](https://github.com/stackvo/stackvo-ui/workflows/Build%20and%20Push%20to%20Docker%20Hub/badge.svg)](https://github.com/stackvo/stackvo-ui/actions)

Modern, web-based UI for managing Docker containers, services, and projects. Built with Vue.js 3 + Vuetify 3 + Node.js + Express.

## Features

- 🎨 **Modern UI** - Responsive design with Vuetify 3 Material Design
- 🐳 **Docker Management** - Container, service, and project management
- 📊 **Real-time Monitoring** - Live updates with Socket.IO
- 🔧 **Service Control** - Enable/disable services on the fly
- 📁 **Project Management** - Create, build, start, stop, and delete projects
- 🖥️ **Web Terminal** - Integrated terminal with xterm.js
- 🔄 **Live Logs** - Real-time container logs streaming

## Quick Start

### Using Docker Compose

```yaml
version: "3.8"

services:
  stackvo-ui:
    image: stackvo/stackvo-ui:latest
    container_name: stackvo-ui
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      NODE_ENV: production
```

```bash
docker-compose up -d
```

### Using Docker CLI

```bash
docker run -d \
  --name stackvo-ui \
  -p 80:80 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e NODE_ENV=production \
  stackvo/stackvo-ui:latest
```

Access the UI at `http://localhost`

## Environment Variables

| Variable        | Default          | Description                      |
| --------------- | ---------------- | -------------------------------- |
| `NODE_ENV`      | `production`     | Node.js environment              |
| `STACKVO_ROOT`  | `/app`           | Stackvo root directory           |
| `PROJECTS_DIR`  | `/app/projects`  | Projects directory               |
| `GENERATED_DIR` | `/app/generated` | Generated configs directory      |
| `HOST_UID`      | `1000`           | Host user ID for file ownership  |
| `HOST_GID`      | `1000`           | Host group ID for file ownership |

## Ports

- `80` - Nginx (HTTP)

## Volumes

| Volume                 | Description                  | Required    |
| ---------------------- | ---------------------------- | ----------- |
| `/var/run/docker.sock` | Docker socket for API access | ✅ Yes      |
| `/app/projects`        | Projects directory           | ⚠️ Optional |
| `/app/generated`       | Generated configs            | ⚠️ Optional |
| `/app/logs`            | Application logs             | ⚠️ Optional |

## Architecture

```
┌─────────────────────────────────────┐
│         Nginx (Port 80)             │
│  ┌──────────────┐  ┌──────────────┐ │
│  │   Frontend   │  │   Backend    │ │
│  │  (Vue.js 3)  │  │ (Node.js +   │ │
│  │  (Vuetify 3) │  │  Express)    │ │
│  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────┘
           │                │
           │                └──────────┐
           │                           │
    Static Files                  Docker API
    (dist/)                    (/var/run/docker.sock)
```

## Technology Stack

### Frontend

- **Vue.js 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component framework
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **xterm.js** - Terminal emulator
- **Axios** - HTTP client

### Backend

- **Node.js 20** - JavaScript runtime
- **Express** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Dockerode** - Docker API client
- **node-pty** - Terminal emulation

### Infrastructure

- **Nginx** - Web server and reverse proxy
- **Docker** - Containerization

## Tags

- `latest` - Latest stable release (main branch)
- `develop` - Development branch
- `v1.0.0` - Specific version (semantic versioning)
- `v1.0` - Major.minor version

## Development

### Local Build

```bash
# Clone repository
git clone https://github.com/stackvo/stackvo-ui.git
cd stackvo-ui

# Build image
docker build -t stackvo-ui:local .

# Run container
docker run -d -p 80:80 -v /var/run/docker.sock:/var/run/docker.sock stackvo-ui:local
```

### Local Development (Hot Reload)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## API Endpoints

### Projects

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `POST /api/projects/:name/build` - Build project
- `POST /api/projects/:name/start` - Start project
- `POST /api/projects/:name/stop` - Stop project
- `DELETE /api/projects/:name` - Delete project

### Services

- `GET /api/services` - List all services
- `POST /api/services/:name/enable` - Enable service
- `POST /api/services/:name/disable` - Disable service

### Docker

- `GET /api/docker/containers` - List containers
- `GET /api/docker/images` - List images
- `GET /api/docker/networks` - List networks
- `GET /api/docker/volumes` - List volumes

### Tools

- `GET /api/tools` - List available tools
- `POST /api/tools/:name/enable` - Enable tool
- `POST /api/tools/:name/disable` - Disable tool

## WebSocket Events

### Client → Server

- `terminal:input` - Send input to terminal
- `terminal:resize` - Resize terminal

### Server → Client

- `build:progress` - Build progress updates
- `build:success` - Build completed successfully
- `build:error` - Build failed
- `terminal:output` - Terminal output data

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- **GitHub Repository**: https://github.com/stackvo/stackvo-ui
- **Docker Hub**: https://hub.docker.com/r/stackvo/stackvo-ui
- **Main Stackvo Project**: https://github.com/stackvo/stackvo
- **Issues**: https://github.com/stackvo/stackvo-ui/issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue on GitHub or contact the Stackvo team.
