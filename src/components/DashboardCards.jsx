function DashboardCards({
  totalExpenses,
  totalCount,
  highestExpense,
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          width: '250px',
          color: 'white',
        }}
      >
        <h3>Total Expenses</h3>
        <h1>₹{totalExpenses}</h1>
      </div>

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          width: '250px',
          color: 'white',
        }}
      >
        <h3>Total Transactions</h3>
        <h1>{totalCount}</h1>
      </div>

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          width: '250px',
          color: 'white',
        }}
      >
        <h3>Highest Expense</h3>
        <h1>₹{highestExpense}</h1>
      </div>
    </div>
  );
}

export default DashboardCards;