import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

// Allow direct function triggers in development
const functions = [
  processRecurringTransaction,
  triggerRecurringTransactions,
  generateMonthlyReports,
  checkBudgetAlerts,
];

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
  devMode: process.env.NODE_ENV === 'development',
});
