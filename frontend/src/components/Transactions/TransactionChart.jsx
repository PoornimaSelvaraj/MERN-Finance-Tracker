import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { listTransactionsAPI } from "../../services/transactions/transactionServices";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  if (isLoading) return <p className="text-center mt-10">Loading chart...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  // Example aggregation logic
  const income = transactions?.filter((t) => t.type === "income") || [];
  const expense = transactions?.filter((t) => t.type === "expense") || [];

  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
  const expenseTotal = expense.reduce((acc, curr) => acc + curr.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#4CAF50", "#F87171"],
        borderColor: ["#388E3C", "#DC2626"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Transaction Overview
        </h1>
        <div className="flex justify-center items-center h-[350px]">
          <div className="w-80">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
