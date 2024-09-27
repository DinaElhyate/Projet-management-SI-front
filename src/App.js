import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    yearsAtCompany: '',
    educationLevel: '',
    performanceScore: '',
    employeeSatisfactionScore: '',
    remoteWorkFrequency: '',
    sickDays: '',
    overtimeHours: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: [
          Number(formData.age),
          Number(formData.yearsAtCompany),
          Number(formData.educationLevel),
          Number(formData.performanceScore),
          Number(formData.employeeSatisfactionScore),
          Number(formData.remoteWorkFrequency),
          Number(formData.sickDays),
          Number(formData.overtimeHours),
        ],
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Échec de la récupération de la prédiction. Veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="prediction-form">
        <h1 className="form-title">Prédiction de la démission des employés</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">Age :</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearsAtCompany">Années dans l'entreprise :</label>
            <input
              type="number"
              name="yearsAtCompany"
              placeholder="Années dans l'entreprise"
              value={formData.yearsAtCompany}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="educationLevel">Niveau d'éducation (encodé) :</label>
            <input
              type="number"
              name="educationLevel"
              placeholder="Niveau d'éducation"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="performanceScore">Score de performance :</label>
            <input
              type="number"
              name="performanceScore"
              placeholder="Score de performance"
              value={formData.performanceScore}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeeSatisfactionScore">Score de satisfaction des employés :</label>
            <input
              type="number"
              name="employeeSatisfactionScore"
              placeholder="Score de satisfaction"
              value={formData.employeeSatisfactionScore}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="remoteWorkFrequency">Fréquence du télétravail :</label>
            <input
              type="number"
              name="remoteWorkFrequency"
              placeholder="Fréquence du télétravail"
              value={formData.remoteWorkFrequency}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sickDays">Jours de congé maladie :</label>
            <input
              type="number"
              name="sickDays"
              placeholder="Jours de congé maladie"
              value={formData.sickDays}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="overtimeHours">Heures supplémentaires :</label>
            <input
              type="number"
              name="overtimeHours"
              placeholder="Heures supplémentaires"
              value={formData.overtimeHours}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Prédire</button>
        </form>

        {prediction !== null && (
          <div>
            <h2>Prédiction : {prediction}</h2>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
