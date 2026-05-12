function Navbar({ setShowMessage }) {
  return (
    <nav
      style={{
        padding: '20px',
        backgroundColor: '#1e293b',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h2>AI Expense Tracker</h2>

      <button
      onClick={() => setShowMessage(true)}
        style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#38bdf8',
          color: 'black',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add Expense
      </button>
    </nav>
  );
}

export default Navbar;