import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function ExpenseChart({ expenses }) {
  const categoryData = [];

  const categories = ['Food', 'Travel', 'Shopping', 'Bills'];

  categories.forEach((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

    categoryData.push({
      name: category,
      value: total,
    });
  });

  const COLORS = [
    '#4ade80',
    '#38bdf8',
    '#facc15',
    '#fb7185',
  ];
    const hasExpenses = categoryData.some(
  (item) => item.value > 0
);

if (!hasExpenses) {
  return null;
}

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '40px',
      }}
    >
      <h2
        style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Expense Analytics
      </h2>

      <PieChart width={350} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;