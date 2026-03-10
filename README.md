# URL Shortener

A full-stack URL shortener built with Node.js, Express, MongoDB, and EJS.  
It supports user signup/login, short link generation, and click analytics.

## Built With
- Node.js + Express
- MongoDB + Mongoose
- EJS (server-side rendered views)
- JWT + cookie-parser (authentication)
- bcryptjs (password hashing)
- nanoid (short ID generation)

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally

### Installation
1. Clone the repository:
	```bash
	git clone https://github.com/atishkr25/Url_shortener
	cd URL_SHORTNER
	```

2. Install dependencies:
	```bash
	npm install
	```

3. Create a `.env` file in project root:
	```env
	JWT_SECRET=your_secret_key
	PORT=8002
	```

4. Ensure MongoDB is running on:
	```
	mongodb://127.0.0.1:27017/short-url
	```

## Running the App
Start the development server:

```bash
npm run dev
```

Open `http://localhost:8002` in your browser.

## Usage
1. Go to `/signup` and create an account.
2. Login from `/login`.
3. Paste a long URL on home page and create a short URL.
4. Open the short URL to redirect.
5. Track clicks using analytics endpoint.

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
## overview
<img width="1468" height="883" alt="Screenshot 2026-03-10 at 11 32 17 AM" src="https://github.com/user-attachments/assets/cbb6f92e-0d6b-4587-a916-37e7a6edabd1" />

## Architecture
<img width="821" height="535" alt="architecture" src="https://github.com/user-attachments/assets/5520caa1-3602-45f0-9705-80cf2bdd6a0c" />

## Project Structure
```
controllers/
middleware/
models/
routes/
views/
index.js
connect.js
```

## Contributing
Feel free to fork this repo and raise a pull request. Contributions are welcome.



