function Stats({ total, completed }) {
  return (
    <div className="flex gap-8 mt-4 text-gray-700">
      <p>Active Tasks: <b>{total - completed}</b></p>
      <p>Completed: <b>{completed}</b></p>
      <p>
        Focus Score:{" "}
        <b>
          {total === 0 ? 0 : Math.round((completed / total) * 100)}%
        </b>
      </p>
    </div>
  );
}

export default Stats;