import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [age, setAge] = useState('');
    const [yearsAtCompany, setYearsAtCompany] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [performanceScore, setPerformanceScore] = useState('');
    const [employeeSatisfactionScore, setEmployeeSatisfactionScore] = useState('');
    const [remoteWorkFrequency, setRemoteWorkFrequency] = useState('');
    const [sickDays, setSickDays] = useState('');
    const [overtimeHours, setOvertimeHours] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const features = [
            parseInt(age),
            parseInt(yearsAtCompany),
            parseInt(educationLevel),
            parseFloat(performanceScore),
            parseFloat(employeeSatisfactionScore),
            parseInt(remoteWorkFrequency),
            parseInt(sickDays),
            parseInt(overtimeHours),
        ];

        try {
            const response = await axios.post('http://localhost:5000/predict', { features });
            setPrediction(response.data.prediction);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching prediction:', error);
            setError('Failed to fetch prediction. Please try again.');
        }
    };

    return (
        <div>
            <h2>Employee Resignation Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                <input type="number" placeholder="Years at Company" value={yearsAtCompany} onChange={(e) => setYearsAtCompany(e.target.value)} required />
                <input type="number" placeholder="Education Level (0, 1, 2...)" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} required />
                <input type="number" placeholder="Performance Score" value={performanceScore} onChange={(e) => setPerformanceScore(e.target.value)} required />
                <input type="number" placeholder="Employee Satisfaction Score" value={employeeSatisfactionScore} onChange={(e) => setEmployeeSatisfactionScore(e.target.value)} required />
                <input type="number" placeholder="Remote Work Frequency" value={remoteWorkFrequency} onChange={(e) => setRemoteWorkFrequency(e.target.value)} required />
                <input type="number" placeholder="Sick Days" value={sickDays} onChange={(e) => setSickDays(e.target.value)} required />
                <input type="number" placeholder="Overtime Hours" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} required />
                <button type="submit">Predict</button>
            </form>
            {prediction !== null && (
                <h3>Prediction: {prediction === 1 ? 'Resigned' : 'Not Resigned'}</h3>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PredictionForm;
