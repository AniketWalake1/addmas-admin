import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Replace with your Firebase config
import "./CheckReports.css"
import * as xlsx from 'xlsx';

const exportToExcel = (data, fileName) => {
  const headers = [
    'Time',
    'Shift',
    'Date',
    'Operator Name',
    'Job Number',
    'Bore Diameter 70',
    'Bore Diameter 180',
    'Bore Diameter 32',
    'Outer Diameter 0.215',
    'Outer Diameter 0.198',
    'Boss OD',
    'Chamfer 1x45',
    'Chamfer 0.5x45',
    'Chamfer 1x30',
    'Radius R0.3',
    'Radius R0.5',
    'Radius R10',
    'Depth 19.2',
    'Depth 5.0',
    'Depth 1.8',
    'Depth 10',
    'Depth 6',
    'Depth 26.8',
    'Surface Finish 3.2',
    'Run Out 0.03',
    'Run Out 0.05',
    'Run Out 0.3',
    'Squareness 0.03',
    'Squareness 0.05',
    'Squareness 0.3',
    'Total Length 90',
  ];

  const worksheet = xlsx.utils.json_to_sheet(data, { header: headers });
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(excelData);
  downloadLink.download = `${fileName}.xlsx`;
  downloadLink.click();
};

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersCollection = collection(db, 'InProcessReport');
        const ordersSnapshot = await getDocs(ordersCollection);
        const orderList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          time: doc.data().time,
          Shift: doc.data().Shift,
          Date: doc.data().Date,
          OpName: doc.data().OpName,
          JobNumber: doc.data().JobNumber,
          ...doc.data(), // Spread all other properties
        }));
    
        // Sort the orders by Date, Shift, and JobNumber
        orderList.sort((a, b) => {
          if (a.Date < b.Date) return -1;
          if (a.Date > b.Date) return 1;
          if (a.Shift < b.Shift) return -1;
          if (a.Shift > b.Shift) return 1;
          if (a.JobNumber < b.JobNumber) return -1;
          if (a.JobNumber > b.JobNumber) return 1;
          return 0;
        });
    
        setOrders(orderList);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      }
    };

    getOrders();
  }, []);

  const exportAll = () => {
    const transformedData = orders.map(order => ({
      Time: order.time,
      Shift: order.Shift,
      Date: order.Date,
      'Operator Name': order.OpName,
      'Job Number': order.JobNumber,
      ...order, // Spread the remaining properties
    }));
  
    const headers = [
      'Time',
      'Shift',
      'Date',
      'Operator Name',
      'Job Number',
      // Add any other custom headers you want
    ];
  
    exportToExcel(transformedData, 'all_orders', headers);
  };
  
  const exportByDateAndShift = (date, shift) => {
    const filteredOrders = orders.filter(order => order.Date === date && order.Shift === shift);
    const transformedData = filteredOrders.map(order => ({
      Time: order.time,
      Shift: order.Shift,
      Date: order.Date,
      'Operator Name': order.OpName,
      'Job Number': order.JobNumber,
      ...order, // Spread the remaining properties
    }));
  
    const headers = [
      'Time',
      'Shift',
      'Date',
      'Operator Name',
      'Job Number',
      // Add any other custom headers you want
    ];
  
    exportToExcel(transformedData, `orders_${date}_${shift}`, headers);
  };
  
  const exportToExcel = (data, fileName, headers) => {
    if (data.length === 0) {
      console.warn('No data to export');
      return;
    }
  
    const worksheet = xlsx.utils.json_to_sheet(data, { header: headers });
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(excelData);
    downloadLink.download = `${fileName}.xlsx`;
    downloadLink.click();
  };

  const groupedOrders = orders.reduce((acc, order) => {
    const key = `${order.Date}-${order.Shift}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div className="orders-container">
      <button onClick={exportAll}>Export All</button>
      {Object.keys(groupedOrders).length === 0 ? (
        <div className="no-orders">No Data Available</div>
      ) : (
        Object.keys(groupedOrders).map((key) => {
          const [date, shift] = key.split('-');
          const headers = Object.keys(groupedOrders[key][0]);
  
          return (
            <div key={key} className="orders-section">
              <h3>Date: {date}, Shift: {shift}</h3>
              <button onClick={() => exportByDateAndShift(date, shift)}>
                Export {date} - {shift}
              </button>
              <table className="orders-table">
              <thead>
  <tr>
    {headers.map((header) => (
      <th key={header}>{header}</th>
    ))}
  </tr>
</thead>
<tbody>
  {groupedOrders[key].map((report) => (
    <tr key={report.id}>
      {headers.map((header) => (
        <td key={`${report.id}-${header}`}>
          {report[header] || 'N/A'}
        </td>
      ))}
    </tr>
  ))}
</tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrdersList;