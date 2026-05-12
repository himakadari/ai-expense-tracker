import { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  return (
    <div>
      <Navbar setShowMessage={setShowMessage} />

      <div
        style={{
          padding: '30px',
        }}
      >
        <h1
          style={{
            color: 'white',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Welcome to AI Expense Tracker
        </h1>

        <DashboardCards
          totalExpenses={expenses.reduce(
            (total, expense) => total + Number(expense.amount),
            0
          )}
        />
      </div>

      {showMessage && (
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '12px',
            width: '350px',
            marginInline: 'auto',
          }}
        >
          <h2
            style={{
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Add New Expense
          </h2>

          <button
            onClick={() => setShowMessage(false)}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Close
          </button>

          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense Name"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none',
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none',
            }}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
          </select>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none',
            }}
          />

          <button
            onClick={() => {
              const newExpense = {
                name: expenseName,
                amount: amount,
                category: category,
              };

              setExpenses([...expenses, newExpense]);

              setExpenseName('');
              setAmount('');
              setCategory('');
            }}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#38bdf8',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Save Expense
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: '40px',
          padding: '30px',
          color: 'white',
        }}
      >
        <h2>Expense List</h2>

        {expenses.map((expense, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#1e293b',
              padding: '15px',
              marginTop: '10px',
              borderRadius: '8px',
            }}
          >
            <h3>{expense.name}</h3>

            <p>₹{expense.amount}</p>

            <p>Category: {expense.category}</p>

            <button
              onClick={() => {
                const updatedExpenses = expenses.filter(
                  (_, expenseIndex) => expenseIndex !== index
                );

                setExpenses(updatedExpenses);
              }}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#ef4444',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;