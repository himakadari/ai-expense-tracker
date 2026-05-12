function DashboardCards({ totalExpenses }) {
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
        <h3>Total Balance</h3>
        <h1>₹25,000</h1>
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
        <h3>Total Income</h3>
        <h1>₹40,000</h1>
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
        <h3>Total Expenses</h3>
        <h1>₹{totalExpenses}</h1>
      </div>
    </div>
  );
}

export default DashboardCards;