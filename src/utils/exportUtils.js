import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const exportToCSV = (data, filename = 'attendance_records.csv') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const prepareAttendanceData = (records) => {
  return records.map(record => ({
    'Student ID': record.studentId,
    'Student Name': record.studentName,
    'Class': record.className || 'N/A',
    'Date': record.date,
    'Time': record.time,
    'Timestamp': record.timestamp,
  }));
};

export const exportAttendanceToCSV = (records) => {
  const data = prepareAttendanceData(records);
  exportToCSV(data);
};

export const filterRecordsByDate = (records, startDate, endDate) => {
  return records.filter(record => {
    const recordDate = new Date(record.timestamp);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    return recordDate >= start && recordDate <= end;
  });
};

export const filterRecordsByClass = (records, className) => {
  if (!className) return records;
  return records.filter(record => record.className === className);
};

export const filterRecordsByStudent = (records, studentName) => {
  if (!studentName) return records;
  return records.filter(record => 
    record.studentName.toLowerCase().includes(studentName.toLowerCase())
  );
};
