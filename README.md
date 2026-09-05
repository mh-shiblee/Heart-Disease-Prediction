# Heart Disease Prediction API

A machine learning web application that predicts the presence of heart disease based on patient health information.

The project uses **XGBoost** for classification, **FastAPI** for serving predictions through a REST API, and **Docker** for containerization and deployment.

## Features

- Heart disease binary classification
- XGBoost machine learning model
- FastAPI REST API
- Pydantic input validation
- Interactive Swagger API documentation
- Simple HTML, CSS, and JavaScript frontend
- Docker and Docker Compose support
- Ready for cloud deployment
- Health check and model information endpoints

## Tech Stack

| Technology          | Purpose                            |
| ------------------- | ---------------------------------- |
| Python 3.12         | Programming language               |
| XGBoost             | Machine learning model             |
| Scikit-learn        | Data preprocessing and ML pipeline |
| Pandas              | Data processing                    |
| Joblib              | Model serialization                |
| FastAPI             | Backend REST API                   |
| Pydantic            | Request validation                 |
| HTML/CSS/JavaScript | Frontend                           |
| Docker              | Containerization                   |
| Docker Compose      | Local container management         |
| Render              | Cloud deployment                   |

## Dataset

The project uses the **Heart Disease Dataset** from Kaggle.

Dataset source:

https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset

The target variable is:

- `0` — No heart disease
- `1` — Heart disease

### Input Features

The model uses the following 13 features:

- `age`
- `sex`
- `cp`
- `trestbps`
- `chol`
- `fbs`
- `restecg`
- `thalach`
- `exang`
- `oldpeak`
- `slope`
- `ca`
- `thal`

## Machine Learning

An XGBoost classifier is trained using a Scikit-learn pipeline.

The preprocessing pipeline applies:

- StandardScaler to numerical features
- Passthrough for categorical features

The trained pipeline is saved as:

```text
model/heart_model.joblib
```

The complete preprocessing and model pipeline is saved together so that the API can receive raw input values without requiring separate preprocessing code.

## API Endpoints

### `GET /`

Returns the frontend application.

### `GET /health`

Checks whether the API is running.

Example response:

```json
{
  "status": "healthy"
}
```

### `GET /info`

Returns information about the model and input features.

### `POST /predict`

Accepts patient information and returns the prediction.

Example request:

```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

Example response:

```json
{
  "heart_disease": true
}
```

## Input Validation

The API uses Pydantic to validate incoming requests.

Examples of validation rules include:

- `sex`: 0–1
- `cp`: 0–3
- `fbs`: 0–1
- `restecg`: 0–2
- `exang`: 0–1
- `slope`: 0–2
- `ca`: 0–4
- `thal`: 0–3

Invalid requests are rejected by FastAPI with a `422 Unprocessable Entity` response.

## Project Structure

```text
heart-disease-prediction/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── schemas.py
│
├── model/
│   └── heart_model.joblib
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .gitignore
└── README.md
```

## Running Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd heart-disease-prediction
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI application

```bash
uvicorn app.main:app --reload
```

The application will be available at:

```text
http://127.0.0.1:8000
```

## API Documentation

FastAPI automatically provides interactive Swagger documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

You can test all API endpoints directly from Swagger UI.

## Running with Docker

Make sure Docker Desktop is installed and running.

### Build the Docker image

```bash
docker compose build
```

### Start the application

```bash
docker compose up
```

The application will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

### Stop the application

```bash
docker compose down
```

## Docker Architecture

```text
                    Browser
                       │
                       ▼
              ┌─────────────────┐
              │   FastAPI App   │
              │    Port 8000    │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │   Pydantic      │
              │    Validation   │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ XGBoost Pipeline│
              │  heart_model    │
              └────────┬────────┘
                       │
                       ▼
                 Prediction
```

## Frontend

The application includes a simple web interface built with:

- HTML
- CSS
- JavaScript

The frontend sends patient information to the FastAPI `/predict` endpoint using JavaScript `fetch()` and displays the returned prediction.

## Deployment

The application is containerized using Docker and can be deployed as a Docker Web Service on cloud platforms such as Render.

Deployment process:

```text
GitHub Repository
       │
       ▼
   Render
       │
       ▼
 Docker Build
       │
       ▼
 FastAPI Container
       │
       ▼
 Public Web Application
```

## Requirements

The project uses:

```text
Python 3.12
scikit-learn 1.6.1
xgboost 3.4.1
```

The versions are pinned where required to maintain compatibility with the serialized machine learning model.

🚀 Live Demo

Live Application: https://heart-disease-prediction-mkb8.onrender.com/

API Documentation: https://heart-disease-prediction-mkb8.onrender.com/docs

The application is deployed as a Docker Web Service on Render and provides a web interface for making heart disease predictions.

## Disclaimer

This project is developed for educational and demonstration purposes. The prediction produced by the model should not be considered a medical diagnosis or used as a substitute for professional medical advice.

## Author

**Mahmudul Hasan Shiblee**

Machine Learning • FastAPI • Docker • Deployment
