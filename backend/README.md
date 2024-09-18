# API

A simple API built using [Express.js](https://expressjs.com).

## Getting Started

1. Setup a MySQL/MariaDB database
2. Run all `migrations/migrations-*.sql` files in numerical order in the database
3. Install all NPM modules:
```bash
npm install
```
4. Create a `.env` from `.env.example` (and modify the contents as appropriate):
```bash
cp .env.example .env
```

## Development

To run the development server:
```bash
npm start
```

To run linting and code formatting:
```bash
npm run prebuild
```

To run unit tests:
```bash
npm test
```

## Production

- Set the `NODE_ENV` environment variable to `production`
- Run the Node process using something like `pm2` or `systemd`
- Use a firewall to block direct access to the Node process
- Setup a reverse proxy for access (see exampele in `etc/nginx/nginx.conf`)

A test username for App Store Review is included: `APP-REVIEW-TESTER`.
