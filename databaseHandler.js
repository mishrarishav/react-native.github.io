import SQLite from 'react-native-sqlite-storage';

let db;

export async function initializeDatabase() {
  db = await SQLite.openDatabase(
    {
      name: 'MainDB',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error.message);
    },
  );
}

export async function createTables() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
        'tbl_scan_detail ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, scan_detail TEXT, vendor TEXT, part TEXT, serial_no TEXT, username TEXT, created_on DATETIME DEFAULT CURRENT_TIMESTAMP);',
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' +
              'tbl_parts ' +
              '(id INTEGER PRIMARY KEY AUTOINCREMENT, part TEXT, created_on DATETIME DEFAULT CURRENT_TIMESTAMP);',
            [],
            (tx, results) => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ' +
                  'tbl_user ' +
                  '(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, role TEXT, password TEXT , created_on DATETIME DEFAULT CURRENT_TIMESTAMP);',
                [],
                (tx, results) => {
                  resolve();
                },
                error => {
                  reject(error);
                },
              );
            },
            error => {
              reject(error);
            },
          );
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function createDuplicateScanTable() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'tbl_duplicate_scan ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, duplicate_scan TEXT, username TEXT, created_on DATETIME DEFAULT CURRENT_TIMESTAMP);',
        [],
        (tx, results) => {
          resolve();
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
export async function saveDuplicateScan(serialNo ,username ) {
  const serial = serialNo.slice(-5);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tbl_duplicate_scan (duplicate_scan, username, created_on) VALUES (?, ?, ?)',
        [serial, username, new Date().toISOString()],
        (tx, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

// databaseHandler.js

export function getAllDuplicateScanDetails() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_duplicate_scan ORDER BY id DESC',
        [],
        (tx, results) => {
          const duplicateScanDetails = [];
          for (let i = 0; i < results.rows.length; i++) {
            duplicateScanDetails.push(results.rows.item(i));
          }
          resolve(duplicateScanDetails);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
// update 

export function getParts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_parts',
        [],
        (tx, results) => {
          const parts = [];
          for (let i = 0; i < results.rows.length; i++) {
            parts.push(results.rows.item(i).part);
          }
          resolve(parts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}


export function getPart() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_parts',
        [],
        (tx, results) => {
          const parts = [];
          for (let i = 0; i < results.rows.length; i++) {
            parts.push(results.rows.item(i));
          }
          resolve(parts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
export function updatePart(id, part) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tbl_parts SET part = ?, created_on = ? WHERE id = ?',
        [part, new Date().toISOString(), id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('No part found with the given id'));
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
export const savePart = async (partNumber) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Check if the part number already exists
      tx.executeSql(
        'SELECT * FROM tbl_parts WHERE part = ?',
        [partNumber],
        (tx, results) => {
          if (results.rows.length > 0) {
            // Part number already exists
            reject(new Error('Part number already exists'));
          } else {
            // Part number does not exist, insert new part number
            tx.executeSql(
              'INSERT INTO tbl_parts (part) VALUES (?)',
              [partNumber],
              (tx, results) => {
                resolve(results);
              },
              (tx, error) => {
                reject(error);
              }
            );
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
export async function saveScanDetail(scanDetail, username) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Extract vendor, part, and serial number from scan detail
      const parts = scanDetail.split('$');
      const vendor = parts[0];
      const part = parts[1];
      const serialNo = parts[2].slice(-5);

      // Get current date and time
      const createdOn = new Date().toISOString();

      // Check if the serial number already exists
      tx.executeSql(
        'SELECT * FROM tbl_scan_detail WHERE serial_no = ?',
        [serialNo],
        (tx, results) => {
          if (results.rows.length > 0) {
            reject(new Error('Duplicate serial number'));
          } else {
            // Serial number does not exist, save the scan detail
            tx.executeSql(
              'INSERT INTO tbl_scan_detail (scan_detail, vendor, part, serial_no, username, created_on) VALUES (?, ?, ?, ?, ?, ?)',
              [scanDetail, vendor, part, serialNo, username, createdOn],
              () => {
                resolve();
              },
              error => {
                reject(error);
              },
            );
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
}




export function createUser(username, role, password) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tbl_user (username, role, password) VALUES (?, ?, ?)',
        [username, role, password],
        (tx, results) => {
          // This is the success callback
          // "results" contains the results of the operation
          // You can resolve the promise here
         
          resolve(results);
        },
        error => {
          // This is the error callback
          // "error" contains information about the error
          // You can reject the promise here
          reject(error);
        },
      );
    });
  });
}

// export async function getVendors() {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT DISTINCT vendor FROM tbl_scan_detail',
//         [],
//         (tx, results) => {
//           const vendors = [];
//           for (let i = 0; i < results.rows.length; i++) {
//             vendors.push(results.rows.item(i).vendor);
//           }
//           resolve(vendors);
//         },
//         error => {
//           reject(error);
//         },
//       );
//     });
//   });
// }

// export async function getParts() {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT DISTINCT part FROM tbl_parts',
//         [],
//         (tx, results) => {
//           const parts = [];
//           for (let i = 0; i < results.rows.length; i++) {
//             parts.push(results.rows.item(i).part);
//           }
//           resolve(parts);
//         },
//         error => {
//           reject(error);
//         },
//       );
//     });
//   });
// }
export function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_user WHERE username = ? AND password = ?',
        [username, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            // User found, authentication successful
            //console.log(results);
            resolve(true);
          } else {
            // No user found, authentication failed
            resolve(false);
          }
        },
        error => {
          // Error executing SQL
          reject(error);
        },
      );
    });
  });
}
// export async function getUserRole(username ) {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM tbl_user WHERE username = ?',
//         [username],
//         (tx, results) => {
//           if (results.rows.length > 0) {
//             resolve(results.rows.item(0).role);
//           } else {
//             reject(new Error('User not found'));
//           }
//         },
//         error => {
//           reject(error);
//         },
//       );
//     });
//   });
// }


export function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_user',
        [],
        (tx, results) => {
          const users = [];
          for (let i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
          }
          console.log(users);
          resolve(users);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export function getAllScanDetails() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_scan_detail ORDER BY id DESC',
        [],
        (tx, results) => {
          const scanDetails = [];
          for (let i = 0; i < results.rows.length; i++) {
          //  console.log(results.rows.item(i)); 
            scanDetails.push(results.rows.item(i));
          }
 console.log(scanDetails);
          resolve(scanDetails);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}


// -----------------------------Delete 

export function deleteData(page, startDate, endDate) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let tableName;
      switch (page) {
        case 'PartCreate':
          tableName = 'tbl_parts';
          break;
        case 'UserPage':
          tableName = 'tbl_user';
          break;
        case 'InputHandler':
          tableName = 'tbl_scan_detail';
          break;
        default:
          reject(new Error('Invalid page'));
          return;
      }

      // Add time to the startDate and endDate
      const startDateTime = `${startDate} 00:00:00`;
      const endDateTime = `${endDate} 23:59:59`;

      tx.executeSql(
        `DELETE FROM ${tableName} WHERE created_on BETWEEN ? AND ?`,
        [startDateTime, endDateTime],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Data deleted successfully');
          } else {
            console.log('No data found between the given dates');
          }
          resolve();
        },
        error => {
          console.log('Error deleting data:', error);
          reject(error);
        },
      );
    });
  });
}
export function getData(page) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let tableName;
      switch (page) {
        case 'PartCreate':
          tableName = 'tbl_parts';
          break;
        case 'UserPage':
          tableName = 'tbl_user';
          break;
        case 'InputHandler':
          tableName = 'tbl_scan_detail';
          break;
        default:
          reject(new Error('Invalid page'));
          return;
      }

      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
          }
          resolve(data);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export function deleteRow(page, id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let tableName;
      switch (page) {
        case 'PartCreate':
          tableName = 'tbl_parts';
          break;
        case 'UserPage':
          tableName = 'tbl_user';
          break;
        case 'InputHandler':
          tableName = 'tbl_scan_detail';
          break;
        default:
          reject(new Error('Invalid page'));
          return;
      }

      tx.executeSql(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [id],
        (tx, results) => {
          resolve();
        },
        error => {
          reject(error);
        },
      );
    });
  });
}