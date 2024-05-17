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
          BoreDiameter_70: doc.data().BoreDiameter_70,
          BoreDiameter_180: doc.data().BoreDiameter_180,
          BoreDiameter_32: doc.data().BoreDiameter_32,
          OuterDiameter_0215: doc.data().OuterDiameter_0215,
          OuterDiameter_0198: doc.data().OuterDiameter_0198,
          BossOD: doc.data().BossOD,
          Chamfer_1x45: doc.data().Chamfer_1x45,
          Chamfer_0_5x45: doc.data().Chamfer_0_5x45,
          Chamfer_1x30: doc.data().Chamfer_1x30,
          Radius_R0_3: doc.data().Radius_R0_3,
          Radius_R0_5: doc.data().Radius_R0_5,
          Radius_R10: doc.data().Radius_R10,
          Depth_19_2: doc.data().Depth_19_2,
          Depth_5_0: doc.data().Depth_5_0,
          Depth_1_8: doc.data().Depth_1_8,
          Depth_10: doc.data().Depth_10,
          Depth_6: doc.data().Depth_6,
          Depth_26_8: doc.data().Depth_26_8,
          SurfaceFinish_3_2: doc.data().SurfaceFinish_3_2,
          RunOut_0_03: doc.data().RunOut_0_03,
          RunOut_0_05: doc.data().RunOut_0_05,
          RunOut_0_3: doc.data().RunOut_0_3,
          Squareness_0_03: doc.data().Squareness_0_03,
          Squareness_0_05: doc.data().Squareness_0_05,
          Squareness_0_3: doc.data().Squareness_0_3,
          TotalLength_90: doc.data().TotalLength_90,
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
      'Time': order.time,
      'Shift': order.Shift,
      'Date': order.Date,
      'Operator Name': order.OpName,
      'Job Number': order.JobNumber,
      'Bore Diameter 70': order.BoreDiameter_70,
      'Bore Diameter 180': order.BoreDiameter_180,
      'Bore Diameter 32': order.BoreDiameter_32,
      'Outer Diameter 0.215': order.OuterDiameter_0215,
      'Outer Diameter 0.198': order.OuterDiameter_0198,
      'Boss OD': order.BossOD,
      'Chamfer 1x45': order.Chamfer_1x45,
      'Chamfer 0.5x45': order.Chamfer_0_5x45,
      'Chamfer 1x30': order.Chamfer_1x30,
      'Radius R0.3': order.Radius_R0_3,
      'Radius R0.5': order.R0_5,
      'Radius R10': order.Radius_R10,
      'Depth 19.2': order.Depth_19_2,
      'Depth 5.0': order.Depth_5_0,
      'Depth 1.8': order.Depth_1_8,
      'Depth 10': order.Depth_10,
      'Depth 6': order.Depth_6,
      'Depth 26.8': order.Depth_26_8,
      'Surface Finish 3.2': order.SurfaceFinish_3_2,
      'Run Out 0.03': order.RunOut_0_03,
      'Run Out 0.05': order.RunOut_0_05,
      'Run Out 0.3': order.RunOut_0_3,
      'Squareness 0.03': order.Squareness_0_03,
      'Squareness 0.05': order.Squareness_0_05,
      'Squareness 0.3': order.Squareness_0_3,
      'Total Length 90': order.TotalLength_90,
    }));
  
    exportToExcel(transformedData, 'all_orders');
  };

  const exportByDateAndShift = (date, shift) => {
    const filteredOrders = orders.filter(order => order.Date === date && order.Shift === shift);
    const transformedData = filteredOrders.map(order => ({
      'Time': order.time,
      'Shift': order.Shift,
      'Date': order.Date,
      'Operator Name': order.OpName,
      'Job Number': order.JobNumber,
      'Bore Diameter 70': order.BoreDiameter_70,
      'Bore Diameter 180': order.BoreDiameter_180,
      'Bore Diameter 32': order.BoreDiameter_32,
      'Outer Diameter 0.215': order.OuterDiameter_0215,
      'Outer Diameter 0.198': order.OuterDiameter_0198,
      'Boss OD': order.BossOD,
      'Chamfer 1x45': order.Chamfer_1x45,
      'Chamfer 0.5x45': order.Chamfer_0_5x45,
      'Chamfer 1x30': order.Chamfer_1x30,
      'Radius R0.3': order.Radius_R0_3,
      'Radius R0.5': order.R0_5,
      'Radius R10': order.Radius_R10,
      'Depth 19.2': order.Depth_19_2,
      'Depth 5.0': order.Depth_5_0,
      'Depth 1.8': order.Depth_1_8,
      'Depth 10': order.Depth_10,
      'Depth 6': order.Depth_6,
      'Depth 26.8': order.Depth_26_8,
      'Surface Finish 3.2': order.SurfaceFinish_3_2,
      'Run Out 0.03': order.RunOut_0_03,
      'Run Out 0.05': order.RunOut_0_05,
      'Run Out 0.3': order.RunOut_0_3,
      'Squareness 0.03': order.Squareness_0_03,
      'Squareness 0.05': order.Squareness_0_05,
      'Squareness 0.3': order.Squareness_0_3,
      'Total Length 90': order.TotalLength_90,
    }));
  
    exportToExcel(transformedData, `orders_${date}_${shift}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          return (
            <div key={key} className="orders-section">
              <h3>Date: {date}, Shift: {shift}</h3>
              <button onClick={() => exportByDateAndShift(date, shift)}>
                Export {date} - {shift}
              </button>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Shift</th>
                    <th>Date</th>
                    <th>Operator Name</th>
                    <th>Job Number</th>
                    <th>Bore Diameter 70</th>
                    <th>Bore Diameter 180</th>
                    <th>Bore Diameter 32</th>
                    <th>Outer Diameter 0.215</th>
                    <th>Outer Diameter 0.198</th>
                    <th>Boss OD</th>
                    <th>Chamfer 1x45</th>
                    <th>Chamfer 0.5x45</th>
                    <th>Chamfer 1x30</th>
                    <th>Radius R0.3</th>
                    <th>Radius R0.5</th>
                    <th>Radius R10</th>
                    <th>Depth 19.2</th>
                    <th>Depth 5.0</th>
                    <th>Depth 1.8</th>
                    <th>Depth 10</th>
                    <th>Depth 6</th>
                    <th>Depth 26.8</th>
                    <th>Surface Finish 3.2</th>
                    <th>Run Out 0.03</th>
                    <th>Run Out 0.05</th>
                    <th>Run Out 0.3</th>
                    <th>Squareness 0.03</th>
                    <th>Squareness 0.05</th>
                    <th>Squareness 0.3</th>
                    <th>Total Length 90</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedOrders[key].map((report) => (
                    <tr key={report.id}>
                      <td>{report.time}</td>
                      <td>{report.Shift}</td>
                      <td>{report.Date}</td>
                      <td>{report.OpName}</td>
                      <td>{report.JobNumber}</td>
                      <td>{report.BoreDiameter_70 || 'N/A'}</td>
                      <td>{report.BoreDiameter_180 || 'N/A'}</td>
                      <td>{report.BoreDiameter_32 || 'N/A'}</td>
                      <td>{report.OuterDiameter_0215 || 'N/A'}</td>
                      <td>{report.OuterDiameter_0198 || 'N/A'}</td>
                      <td>{report.BossOD || 'N/A'}</td>
                      <td>{report.Chamfer_1x45 || 'N/A'}</td>
                      <td>{report.Chamfer_0_5x45 || 'N/A'}</td>
                      <td>{report.Chamfer_1x30 || 'N/A'}</td>
                      <td>{report.Radius_R0_3 || 'N/A'}</td>
                      <td>{report.Radius_R0_5 || 'N/A'}</td>
                      <td>{report.Radius_R10 || 'N/A'}</td>
                      <td>{report.Depth_19_2 || 'N/A'}</td>
                      <td>{report.Depth_5_0 || 'N/A'}</td>
                      <td>{report.Depth_1_8 || 'N/A'}</td>
                      <td>{report.Depth_10 || 'N/A'}</td>
                      <td>{report.Depth_6 || 'N/A'}</td>
                      <td>{report.Depth_26_8 || 'N/A'}</td>
                      <td>{report.SurfaceFinish_3_2 || 'N/A'}</td>
                      <td>{Number(report.RunOut_0_03 || 0).toFixed(2)}</td>
                      <td>{Number(report.RunOut_0_05 || 0).toFixed(2)}</td>
                      <td>{Number(report.RunOut_0_3 || 0).toFixed(2)}</td>
                      <td>{report.Squareness_0_03 || 'N/A'}</td>
                      <td>{report.Squareness_0_05 || 'N/A'}</td>
                      <td>{report.Squareness_0_3 || 'N/A'}</td>
                      <td>{report.TotalLength_90 || 'N/A'}</td>
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