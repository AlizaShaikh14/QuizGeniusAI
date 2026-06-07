const StatsCard = ({ title, value, color }) => {
  return (
    <div
      className="card"
      style={{
        background: color
      }}
    >
      <h2>{title}</h2>
      <h1>{value}</h1>
    </div>
  );
};

export default StatsCard;