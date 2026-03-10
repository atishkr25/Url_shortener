# URL Shortener

Simple URL shortener with login and click tracking.

## Setup
```bash
npm install
```

Create `.env`:
```env
JWT_SECRET=your_secret_key
PORT=your port number, as your wish
```

MongoDB should be running locally on:
`mongodb://127.0.0.1:27017/your-database-name`

## Run
```bash
npm run dev
```

Open: `http://localhost:PORT`

## All Routes
- `GET /` - Home page (shows user URLs if logged in).
- `GET /signup` - Signup page.
- `GET /login` - Login page.
- `GET /logout` - Logout user (clears auth cookie).

- `POST /user/signup` - Create a new user account.
- `POST /user/login` - Authenticate user and set JWT cookie.

- `GET /url` - Home view with URL list.
- `POST /url` - Generate a short URL (auth required).
- `GET /url/analytics/:shortId` - Get click analytics for a short URL.

- `GET /:shortId` - Redirect short code to original URL.