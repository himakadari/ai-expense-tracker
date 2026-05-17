import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

 useEffect(() => {
  if (expenses.length > 0) {
    localStorage.setItem(
      'expenses',
      JSON.stringify(expenses)
    );
  }
}, [expenses]);
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
          totalCount={expenses.length}
          highestExpense={
            expenses.length > 0
              ? Math.max(
                  ...expenses.map((expense) =>
                    Number(expense.amount)
                  )
                )
              : 0
          }
        />
      </div>

      {showMessage && (
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#1e293b',
            padding: '25px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '350px',
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
              if (!expenseName || !amount || !category) {
                alert('Please fill all fields');
                return;
              }

              const newExpense = {
                name: expenseName,
                amount: amount,
                category: category,
                date: new Date().toLocaleDateString(),
              };

              if (editingIndex !== null) {
                const updatedExpenses = [...expenses];

                updatedExpenses[editingIndex] = newExpense;

                setExpenses(updatedExpenses);

                setEditingIndex(null);
              } else {
                setExpenses([...expenses, newExpense]);
              }

              setExpenseName('');
              setAmount('');
              setCategory('');
              setShowMessage(false);

              setSuccessMessage(
                'Expense Added Successfully!'
              );

              setTimeout(() => {
                setSuccessMessage('');
              }, 2000);
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
          maxWidth: '800px',
          margin: 'auto',
          color: 'white',
        }}
      >
        {successMessage && (
          <p
            style={{
              color: '#4ade80',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            {successMessage}
          </p>
        )}

        <h2>Expense List</h2>

        <button
          onClick={() => setExpenses([])}
          style={{
            marginTop: '15px',
            marginBottom: '20px',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#ef4444',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Clear All Expenses
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search expenses..."
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: 'none',
          }}
        />

        {expenses.filter((expense) =>
          expense.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ).length === 0 ? (
          <p
            style={{
              marginTop: '20px',
              color: '#94a3b8',
            }}
          >
            No matching expenses found.
          </p>
        ) : (
          expenses
            .slice()
            .reverse()
            .filter((expense) =>
              expense.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((expense, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#1e293b',
                  padding: '15px',
                  marginTop: '10px',
                  borderRadius: '8px',
                  transition: '0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'scale(1)';
                }}
              >
                <h3>{expense.name}</h3>

                <p>₹{expense.amount}</p>

                <p
                  style={{
                    color:
                      expense.category === 'Food'
                        ? '#4ade80'
                        : expense.category === 'Travel'
                        ? '#38bdf8'
                        : expense.category === 'Shopping'
                        ? '#facc15'
                        : '#fb7185',
                  }}
                >
                  Category: {expense.category}
                </p>

                <p>Date: {expense.date}</p>

                <button
                  onClick={() => {
                    setExpenseName(expense.name);
                    setAmount(expense.amount);
                    setCategory(expense.category);
                    setShowMessage(true);
                    setEditingIndex(index);
                  }}
                  style={{
                    marginTop: '10px',
                    marginRight: '10px',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#38bdf8',
                    color: 'black',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    const updatedExpenses =
                      expenses.filter(
                        (_, expenseIndex) =>
                          expenseIndex !== index
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
            ))
        )}


        <ExpenseChart expenses={expenses} />
        <footer
          style={{
            textAlign: 'center',
            padding: '20px',
            color: '#94a3b8',
          }}
        >
          Built with React by Hima 🚀
        </footer>
      </div>
    </div>
  );
}

export default App;