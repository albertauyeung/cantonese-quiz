# Cantonese Quiz Game

A fun and educational quiz game for kids to learn Cantonese. The game features multiple topics, timed questions, and a scoring system.

## Features

- Welcome screen with start button
- Topic selection screen with scrollable list
- Game screen with questions, choices, timer, and score counter
- Finish screen showing final score and percentage
- Responsive design for mobile, tablet, and desktop
- Modern UI with soft colors and smooth animations

## Tech Stack

- Backend: Python FastAPI
- Frontend: React with Tailwind CSS
- Data Storage: JSON files
- Development: VS Code with recommended extensions

## Setup Instructions

### Prerequisites

- Python 3.11+ (specified in .python-version)
- Node.js 18+ (LTS recommended)
- VS Code (optional but recommended)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python main.py
   ```

The backend server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## Project Structure

```
cantonese-quiz/
├── backend/
│   ├── data/              # JSON data files
│   ├── .venv/             # Python virtual environment
│   ├── main.py            # FastAPI application
│   ├── pyproject.toml     # Python project configuration
│   ├── requirements.txt   # Python dependencies
│   ├── uv.lock           # Dependency lock file
│   └── .python-version    # Python version specification
├── frontend/
│   ├── src/              # React source code
│   │   ├── screens/      # Screen components
│   │   │   ├── WelcomeScreen.js
│   │   │   ├── TopicScreen.js
│   │   │   ├── GameScreen.js
│   │   │   └── FinishScreen.js
│   │   └── App.js
│   ├── public/           # Static assets
│   ├── build/            # Production build
│   ├── package.json      # Node.js dependencies
│   └── tailwind.config.js
└── README.md
```

## Development

- The project uses VS Code with recommended extensions for Python and JavaScript development
- Backend uses FastAPI for API development
- Frontend uses React with Tailwind CSS for styling
- Development server supports hot reloading for both frontend and backend

## Adding New Topics

To add a new topic:

1. Create a new JSON file in the `backend/data` directory
2. Follow the schema:
   ```json
   {
     "topic": "Topic Name",
     "description": "Topic Description",
     "questions": [
       {
         "title": "Question Text",
         "choices": [
           {
             "value": "Choice Text",
             "correct_answer": true/false
           }
         ]
       }
     ]
   }
   ```

## Contributing

Feel free to contribute by:
1. Adding new topics
2. Improving the UI/UX
3. Adding new features
4. Fixing bugs

## License

MIT License 