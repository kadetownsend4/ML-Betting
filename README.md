# Better Picks

*Using Machine Learning to Make Smarter Sports Betting Decisions*

A senior capstone project developed by students at Southwestern University, Spring 2025.

## Overview

**Better Picks** is a full-stack web application designed to help users make more informed sports betting decisions. Using machine learning models trained on real-world NFL and NBA data, the platform provides dynamic predictions such as:

- NBA game win/loss outcomes
- NFL quarterback passing yard projections

The application combines robust data processing pipelines, predictive modeling, and a responsive frontend to deliver valuable insights in a clean, intuitive interface.

---

## Demos
<table>
  <tr>
    <td align="center">
    <a href="https://drive.google.com/file/d/1yOMooNF6dImlHoPNi6qKuQxfXkCVylnL/view?usp=sharing" target="_blank">
      <img width="600" alt="NBA Demo" src="https://github.com/user-attachments/assets/385f7ce7-baf9-481e-bff3-ad59bd3e7825" /><br>
       </a>
      <a href="https://drive.google.com/file/d/1yOMooNF6dImlHoPNi6qKuQxfXkCVylnL/view?usp=sharing">
        <strong>Watch NBA Demo</strong>
      </a>
    </a>
    </td>
    <td align="center">
      <a href="https://drive.google.com/file/d/1z2IhIKxpHPEOZijbPMBf5fTxnobiDb2Q/view?usp=sharing" target="_blank">
      <img width="600" alt="NFL Demo" src="https://github.com/user-attachments/assets/1e7c9d8f-f616-4ae5-8851-e86ee7753ffd" /><br>
      </a>
      <a href="https://drive.google.com/file/d/1z2IhIKxpHPEOZijbPMBf5fTxnobiDb2Q/view?usp=sharing">
        <strong>Watch NFL Demo</strong>
      </a>
    </td>
  </tr>
</table>

---

## Features

- **NFL & NBA Predictive Models**  
  Predict quarterback passing yards and NBA game outcomes with scikit-learn models.

- **Custom Feature Engineering**  
  Includes rolling averages, correlation analysis, and advanced stat integration.

- **Modern Frontend**  
  Built with React, TypeScript, and Next.js for a smooth and scalable user experience.

- **Flask REST API**  
  Seamlessly connects the database, backend, and frontend.

- **PostgreSQL Database**  
  Robust and scalable data storage for real-time access.

- **Daily Data Pipelines**  
  Data scraped and transformed through automated scripts (future automation planned).

---

## Tech Stack

| Layer         | Technologies                                |
|--------------|---------------------------------------------|
| **Frontend**  | React, TypeScript, Next.js                 |
| **Backend**   | Python, Flask, SQLAlchemy                  |
| **Database**  | PostgreSQL (Render-hosted)                 |
| **ML/DS**     | pandas, scikit-learn, Jupyter              |
| **Dev Tools** | Git, DBeaver, dotenv, Render, VS Code     |

---

## Architecture

               ┌────────────────────┐
               │  NFL / NBA APIs    │
               └────────┬───────────┘
                        │
                        ▼
           ┌──────────────────────────┐
           │  Python Data Pipeline    │
           └────────┬─────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │     PostgreSQL Database      │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │   Flask REST API (Backend)   │
         └────────┬─────────────────────┘
                  │
                  ▼
     ┌────────────────────────────────────┐
     │   React + TypeScript + Next.js     │
     │           (Frontend)               │
     └────────────────────────────────────┘

---

## Machine Learning Approach

### NBA Win-Loss Predictions
- **Models Tested**: Logistic Regression, Decision Tree, SVM, Naive Bayes, Gradient Boosting, KNN, MLP, Random Forest
- **Feature Sets**:
  - `OG` – Basic stats from the last game
  - `OG3` – Averages over the past 3 games
  - `REG` – Developer-selected relevant stats
  - `FE` – Feature-engineered composites
  - `CF` – Most correlated stats with winning
    
### NFL QB Passing Yards Prediction
- Scraped weekly QB data using the NFL API
- Integrated Next Gen Stats (e.g., air yards, throw time)
- Built rolling feature sets (1, 3, 5 games)
- Evaluated model performance using MAE, RMSE, and R²

---
## Machine Learning Results 

<img width="475" alt="Screenshot 2025-06-05 at 5 29 41 PM" src="https://github.com/user-attachments/assets/02e5f7fb-a853-4974-93c8-cb4f97180cdc" />
<img width="475" alt="Screenshot 2025-06-05 at 5 32 47 PM" src="https://github.com/user-attachments/assets/10169c56-923b-49f0-99ee-97e52ee0be61" />

 
- Picking the home team to win in NBA games gives a 61% success rate (threshold)
- Gaussian Naive Bayes on OG feature set gives 64.7% success rate on data over three seasons
- Many model-feature set pairs beat the threshold
- F1 scores are consistently in the upper 60s
- Prediction results show that the application can help bettors beat the market

## Future Improvements

- Automate daily model predictions and DB updates  
- Add user login and personalized dashboards  
- Integrate betting lines and prop comparison tools  
- Fine-tune model hyperparameters and test deep learning approaches  
- Add real-time alerts and betting insights based on confidence thresholds  

## Academic Note

> This project was completed as part of the 2025 Computer Science Capstone at Southwestern University under the guidance of Dr. Barbara Anthony.




