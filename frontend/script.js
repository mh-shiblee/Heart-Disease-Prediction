const form = document.getElementById("predictionForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    age: Number(document.getElementById("age").value),
    sex: Number(document.getElementById("sex").value),
    cp: Number(document.getElementById("cp").value),
    trestbps: Number(document.getElementById("trestbps").value),
    chol: Number(document.getElementById("chol").value),
    fbs: Number(document.getElementById("fbs").value),
    restecg: Number(document.getElementById("restecg").value),
    thalach: Number(document.getElementById("thalach").value),
    exang: Number(document.getElementById("exang").value),
    oldpeak: Number(document.getElementById("oldpeak").value),
    slope: Number(document.getElementById("slope").value),
    ca: Number(document.getElementById("ca").value),
    thal: Number(document.getElementById("thal").value),
  };

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const prediction = await response.json();

    result.classList.remove("hidden");

    if (prediction.heart_disease) {
      result.textContent = "Heart Disease: Detected";
    } else {
      result.textContent = "Heart Disease: Not Detected";
    }
  } catch (error) {
    result.classList.remove("hidden");
    result.textContent = "Error connecting to the API.";
  }
});
