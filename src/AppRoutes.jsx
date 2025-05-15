import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardView from './components/views/DashboardView';
import TasksView from './components/views/TasksView';
import CalendarView from './components/CalendarView'; // Using existing file
import AnalyticsView from './components/views/AnalyticsView';
import SettingsView from './components/views/SettingsView';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardView />} />
      <Route path="/tasks" element={<TasksView />} />
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/analytics" element={<AnalyticsView />} />
      <Route path="/settings" element={<SettingsView />} />
    </Routes>
  );
};

export default AppRoutes;
