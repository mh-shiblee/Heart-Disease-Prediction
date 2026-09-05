from fastapi import FastAPI
from fastapi.responses import FileResponse
import joblib
import pandas as pd

from app.schemas import HeartInput
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Heart Disease Prediction API",
    version="1.0"
)

app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

model = joblib.load("model/heart_model.joblib")

FEATURES = [
    "age", "sex", "cp", "trestbps", "chol",
    "fbs", "restecg", "thalach", "exang",
    "oldpeak", "slope", "ca", "thal"
]


@app.get("/")
def root():
    return FileResponse("frontend/index.html")


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/info")
def info():
    return {
        "model": "XGBoost",
        "features": FEATURES
    }


@app.post("/predict")
def predict(data: HeartInput):
    input_df = pd.DataFrame(
        [data.model_dump()],
        columns=FEATURES
    )

    prediction = model.predict(input_df)[0]

    return {
        "heart_disease": bool(prediction)
    }
