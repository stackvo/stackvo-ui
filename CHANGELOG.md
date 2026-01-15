# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-01-15

### Added

- Initial release of Stackvo UI
- Vue.js 3 + Vuetify 3 frontend with Material Design
- Node.js + Express backend API
- Docker container management
- Real-time updates with Socket.IO
- Web-based terminal with xterm.js
- Project management (create, build, start, stop, delete)
- Service enable/disable functionality
- Tools management
- Live container logs streaming
- Multi-stage Docker build for optimized image size
- GitHub Actions CI/CD pipeline for automated builds
- Docker Hub integration for pre-built images

### Technical Details

- Frontend: Vue 3.4.15, Vuetify 3.5.1, Pinia 2.1.7
- Backend: Node.js 20 Alpine, Express 4.18.2, Socket.IO 4.6.1
- Infrastructure: Nginx, Docker CLI, Docker Compose
- Image size: ~735MB (optimized with multi-stage build)
- Platforms: linux/amd64, linux/arm64

[Unreleased]: https://github.com/stackvo/stackvo-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/stackvo/stackvo-ui/releases/tag/v1.0.0
